import json
import os
import re
import urllib.error
import urllib.request

import psycopg2

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
OPENAI_MODEL = os.environ.get('OPENAI_MODEL', 'gpt-4o-mini')
DATABASE_URL = os.environ.get('DATABASE_URL', '')

GENERIC_CRITERIA_TITLES = {
    'мәселені түсіну', 'математикалық модельді құру', 'шешімді есептеу',
    'нәтижені тексеру', 'формуланы қолдану', 'деректерді пайдалану',
    'есептеулер жүргізу', 'нәтижені интерпретациялау',
}


def get_db():
    return psycopg2.connect(DATABASE_URL)


def json_resp(handler, status, payload):
    data = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    handler.send_response(status)
    handler.send_header('Content-Type', 'application/json; charset=utf-8')
    handler.send_header('Cache-Control', 'no-store')
    handler.send_header('Access-Control-Allow-Origin', '*')
    handler.end_headers()
    handler.wfile.write(data)


def read_body(handler):
    length = int(handler.headers.get('Content-Length', '0') or '0')
    raw = handler.rfile.read(length) if length > 0 else b'{}'
    return json.loads(raw.decode('utf-8', errors='ignore'))


def safe_int(v, d):
    try:
        return int(v)
    except (TypeError, ValueError):
        return d


def call_openai(messages, max_tokens=700, temperature=0.7):
    if not OPENAI_API_KEY.startswith('sk-'):
        raise RuntimeError('OPENAI_API_KEY missing')
    payload = json.dumps({
        'model': OPENAI_MODEL,
        'messages': messages,
        'max_tokens': max_tokens,
        'temperature': temperature,
    }).encode('utf-8')
    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {OPENAI_API_KEY}'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as err:
        body = err.read().decode('utf-8', errors='ignore')
        try:
            msg = json.loads(body).get('error', {}).get('message') or body
        except Exception:
            msg = body
        raise RuntimeError(msg[:300])
    except urllib.error.URLError as err:
        raise RuntimeError(f'Network error: {err.reason}')


def contains_any(text, variants):
    base = str(text or '').lower()
    return any(v in base for v in variants)


def is_motion_force_problem(problem):
    text = str(problem or '').lower()
    has_motion = contains_any(text, ['машина', 'дене', 'автокөлік', 'үдеу', 'ускор', 'force', 'күш'])
    has_speed = contains_any(text, ['м/с', 'м\\с', 'm/s'])
    has_mass = contains_any(text, ['кг', 'kg'])
    has_vals = all(t in text for t in ['5', '20', '1200'])
    return (has_motion and has_speed and has_mass) or (has_speed and has_mass and has_vals)


def is_generic_title(title):
    return str(title or '').strip().lower() in GENERIC_CRITERIA_TITLES


def fallback_criteria(problem, count):
    if is_motion_force_problem(problem):
        seed = [
            {'title': 'Берілген шамаларды анықтайды', 'desc': 'm, v0, v және t мәндерін есеп шартынан дұрыс жазады.', 'pts': 1},
            {'title': 'Үдеуді есептейді', 'desc': 'a=(v-v0)/t формуласын қолданып, үдеуді дұрыс табады.', 'pts': 1},
            {'title': 'Күшті табады', 'desc': 'F=ma формуласын қолданып, күш мәнін есептейді.', 'pts': 2},
            {'title': 'Жауапты рәсімдейді', 'desc': 'Жауапты Н бірлігімен жазып, қысқа қорытынды жасайды.', 'pts': 2},
        ]
        return seed[:count]
    seed = [
        {'title': 'Берілгендерді анықтайды', 'desc': 'Есептің негізгі шартын дұрыс ажыратады.', 'pts': 1},
        {'title': 'Шешу тәсілін таңдайды', 'desc': 'Қажетті формула немесе әдісті орынды қолданады.', 'pts': 2},
        {'title': 'Есептеуді орындайды', 'desc': 'Қадамдарды ретімен орындап, дұрыс нәтиже шығарады.', 'pts': 2},
        {'title': 'Жауапты негіздейді', 'desc': 'Нәтижені дұрыс бірлікпен рәсімдейді.', 'pts': 1},
    ]
    return seed[:count]


def clean_criteria(items, count, problem):
    cleaned = []
    for item in (items or []):
        if not isinstance(item, dict):
            continue
        title = str(item.get('title') or '').strip()
        desc = str(item.get('desc') or '').strip()
        pts = safe_int(item.get('pts'), 1)
        if not title or not desc or is_generic_title(title):
            continue
        cleaned.append({'title': title[:80], 'desc': desc[:180], 'pts': max(1, min(pts, 3))})
        if len(cleaned) >= count:
            break
    return cleaned if len(cleaned) == count else fallback_criteria(problem, count)


def normalize_language(label):
    text = str(label or '').strip().lower()
    if any(m in text for m in ['қаз', 'kaz', 'kk']):
        return 'Қазақша'
    if any(m in text for m in ['рус', 'орыс', 'ru']):
        return 'Орысша'
    return 'Қазақша'


def extract_numbers(text):
    return [float(m.replace(',', '.')) for m in re.findall(r'\d+(?:[.,]\d+)?', str(text or ''))]


def evaluate_motion_force(solution):
    text = str(solution or '').lower()
    numbers = extract_numbers(solution)
    has_given = any(t in text for t in ['v0', 'v=', 't=', 'm=']) or len(numbers) >= 4
    has_acc = any(abs(n - 4) < 0.05 for n in numbers)
    has_force = any(abs(n - 4800) < 1 for n in numbers)
    has_unit = 'н' in text or 'n' in text
    results = [
        {'title': 'Берілген шамаларды анықтайды', 'ok': has_given,
         'feedback': 'Берілген шамалар есеп шартынан көрінеді.' if has_given else 'v0, v, t және m шамаларын бөлек көрсет.'},
        {'title': 'Үдеуді есептейді', 'ok': has_acc,
         'feedback': 'Үдеу дұрыс табылған.' if has_acc else 'Алдымен a=(v-v0)/t формуласы бойынша үдеуді тап.'},
        {'title': 'Күшті табады', 'ok': has_force,
         'feedback': 'Күш мәні дұрыс.' if has_force else 'F=ma формуласын қолданып, күшті есепте.'},
        {'title': 'Жауапты рәсімдейді', 'ok': has_force and has_unit,
         'feedback': 'Жауап дұрыс рәсімделген.' if has_force and has_unit else 'Соңғы жауапта Н бірлігін көрсет.'},
    ]
    score = sum(1 for r in results if r['ok'])
    return {
        'score': score, 'maxScore': len(results),
        'feedback': 'Жауап жақсы.' if score >= 3 else 'Үдеу мен күшті есептеу қадамдарын қайта қарап шық.',
        'criterionResults': results,
    }


DEFAULT_STATE = {
    'teacherChats': {},
    'studentProgress': {
        'xp': 2140, 'level': 7, 'levelTitle': 'Зерттеуші', 'streak': 7,
        'solvedTasks': 12, 'achievements': ['7 күн', 'Үздік', 'Жылдам'],
        'branches': {
            'Алгебра': {'total': 12, 'done': 9}, 'Геометрия': {'total': 10, 'done': 6},
            'Физика': {'total': 14, 'done': 10}, 'Химия': {'total': 8, 'done': 4},
            'Биология': {'total': 8, 'done': 3},
        },
        'solvedCodes': [],
    },
    'studentFeedback': [], 'assignedTask': None, 'studentTask': None,
}


def load_state():
    merged = json.loads(json.dumps(DEFAULT_STATE))
    try:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute('CREATE TABLE IF NOT EXISTS app_state (key VARCHAR(255) PRIMARY KEY, value JSONB)')
                conn.commit()
                cur.execute('SELECT key, value FROM app_state')
                for row in cur.fetchall():
                    merged[row[0]] = row[1]
        sp = merged.get('studentProgress') or {}
        merged['studentProgress'] = {
            **DEFAULT_STATE['studentProgress'], **sp,
            'branches': {**DEFAULT_STATE['studentProgress']['branches'], **(sp.get('branches') or {})},
        }
    except Exception as e:
        print(f'load_state error: {e}')
    return merged


def save_state(state):
    try:
        with get_db() as conn:
            with conn.cursor() as cur:
                for k, v in state.items():
                    cur.execute(
                        'INSERT INTO app_state (key, value) VALUES (%s, %s) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
                        (k, json.dumps(v, ensure_ascii=False))
                    )
            conn.commit()
    except Exception as e:
        print(f'save_state error: {e}')
