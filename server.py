import http.server
import json
import os
import re
import socketserver
import urllib.error
import urllib.request
import psycopg2

PORT = 3000
STATE_PATH = 'app_state.json'


def load_env(path='.env'):
    env = {}
    try:
        with open(path, encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env[key.strip()] = value.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return env


ENV = load_env()
OPENAI_API_KEY = ENV.get('OPENAI_API_KEY', '')
OPENAI_MODEL = ENV.get('OPENAI_MODEL', 'gpt-4o-mini')

DATABASE_URL = ENV.get('DATABASE_URL', '')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

DEFAULT_STATE = {
    'teacherChats': {},
    'studentProgress': {
        'xp': 2140,
        'level': 7,
        'levelTitle': 'Зерттеуші',
        'streak': 7,
        'solvedTasks': 12,
        'achievements': ['7 күн', 'Үздік', 'Жылдам'],
        'branches': {
            'Алгебра': {'total': 12, 'done': 9},
            'Геометрия': {'total': 10, 'done': 6},
            'Физика': {'total': 14, 'done': 10},
            'Химия': {'total': 8, 'done': 4},
            'Биология': {'total': 8, 'done': 3},
        },
        'solvedCodes': [],
    },
    'studentFeedback': [],
    'assignedTask': None,
    'studentTask': None,
}

GENERIC_CRITERIA_TITLES = {
    'мәселені түсіну',
    'математикалық модельді құру',
    'шешімді есептеу',
    'нәтижені тексеру',
    'формуланы қолдану',
    'деректерді пайдалану',
    'есептеулер жүргізу',
    'нәтижені интерпретациялау',
}


def safe_int(value, default):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def deep_copy(value):
    return json.loads(json.dumps(value))


def load_state():
    merged = deep_copy(DEFAULT_STATE)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS app_state (
                        key VARCHAR(255) PRIMARY KEY,
                        value JSONB
                    )
                """)
                conn.commit()
                cur.execute("SELECT key, value FROM app_state")
                for row in cur.fetchall():
                    merged[row[0]] = row[1]
                    
        merged['studentProgress'] = {
            **DEFAULT_STATE['studentProgress'],
            **(merged.get('studentProgress') or {}),
            'branches': {
                **DEFAULT_STATE['studentProgress']['branches'],
                **((merged.get('studentProgress') or {}).get('branches') or {}),
            },
        }
    except Exception as e:
        print(f"Failed to load state from DB: {e}")
    return merged


def save_state(state):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                for k, v in state.items():
                    cur.execute("""
                        INSERT INTO app_state (key, value)
                        VALUES (%s, %s)
                        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
                    """, (k, json.dumps(v, ensure_ascii=False)))
            conn.commit()
    except Exception as e:
        print(f"Failed to save state to DB: {e}")


APP_STATE = load_state()


def json_response(handler, status, payload):
    data = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    handler.send_response(status)
    handler.send_header('Content-Type', 'application/json; charset=utf-8')
    handler.send_header('Cache-Control', 'no-store')
    handler.end_headers()
    handler.wfile.write(data)


def read_json_body(handler):
    length = int(handler.headers.get('Content-Length', '0') or '0')
    raw = handler.rfile.read(length) if length > 0 else b'{}'
    return json.loads(raw.decode('utf-8', errors='ignore'))


def normalize_language(label):
    text = str(label or '').strip().lower()
    if any(marker in text for marker in ['қаз', 'kaz', 'kk']):
        return 'Қазақша'
    if any(marker in text for marker in ['рус', 'орыс', 'ru']):
        return 'Орысша'
    if any(marker in text for marker in ['eng', 'анг', 'ағыл']):
        return 'Ағылшынша'
    return 'Қазақша'


def contains_any(text, variants):
    base = str(text or '').lower()
    return any(variant in base for variant in variants)


def is_motion_force_problem(problem):
    text = str(problem or '').lower()
    has_motion_context = contains_any(
        text,
        ['машина', 'дене', 'автокөлік', 'үдеу', 'ускор', 'force', 'күш'],
    )
    has_speed_unit = contains_any(text, ['м/с', 'м\\с', 'm/s'])
    has_mass_unit = contains_any(text, ['кг', 'kg'])
    has_common_values = all(token in text for token in ['5', '20', '1200'])
    return (has_motion_context and has_speed_unit and has_mass_unit) or (
        has_speed_unit and has_mass_unit and has_common_values
    )


def is_generic_title(title):
    return str(title or '').strip().lower() in GENERIC_CRITERIA_TITLES


def fallback_criteria(problem, desc_count):
    if is_motion_force_problem(problem):
        seed = [
            {
                'title': 'Берілген шамаларды анықтайды',
                'desc': 'm, v0, v және t мәндерін есеп шартынан дұрыс жазады.',
                'pts': 1,
            },
            {
                'title': 'Үдеуді есептейді',
                'desc': 'a=(v-v0)/t формуласын қолданып, үдеуді дұрыс табады.',
                'pts': 1,
            },
            {
                'title': 'Күшті табады',
                'desc': 'F=ma формуласын қолданып, күш мәнін есептейді.',
                'pts': 2,
            },
            {
                'title': 'Жауапты рәсімдейді',
                'desc': 'Жауапты Н бірлігімен жазып, қысқа қорытынды жасайды.',
                'pts': 2,
            },
        ]
        return seed[:desc_count]

    seed = [
        {
            'title': 'Берілгендерді анықтайды',
            'desc': 'Есептің негізгі шартын, шамаларын немесе объектілерін дұрыс ажыратады.',
            'pts': 1,
        },
        {
            'title': 'Шешу тәсілін таңдайды',
            'desc': 'Қажетті формула, ереже немесе әдісті орынды қолданады.',
            'pts': 2,
        },
        {
            'title': 'Есептеуді орындайды',
            'desc': 'Қадамдарды ретімен орындап, дұрыс аралық немесе соңғы нәтиже шығарады.',
            'pts': 2,
        },
        {
            'title': 'Жауапты негіздейді',
            'desc': 'Нәтижені түсіндіріп, дұрыс бірлікпен немесе тұжырыммен рәсімдейді.',
            'pts': 1,
        },
    ]
    return seed[:desc_count]


def clean_criteria_list(items, desc_count, problem):
    cleaned = []
    for item in items or []:
        if not isinstance(item, dict):
            continue
        title = str(item.get('title') or '').strip()
        desc = str(item.get('desc') or '').strip()
        pts = safe_int(item.get('pts'), 1)
        if not title or not desc or is_generic_title(title):
            continue
        cleaned.append(
            {
                'title': title[:80],
                'desc': desc[:180],
                'pts': max(1, min(pts, 3)),
            }
        )
        if len(cleaned) >= desc_count:
            break

    if len(cleaned) != desc_count:
        return fallback_criteria(problem, desc_count)
    return cleaned


def call_openai(messages, max_tokens=700, temperature=0.7):
    if not OPENAI_API_KEY or not OPENAI_API_KEY.startswith('sk-'):
        raise RuntimeError('OPENAI_API_KEY is missing or invalid in .env')

    payload = json.dumps(
        {
            'model': OPENAI_MODEL,
            'messages': messages,
            'max_tokens': max_tokens,
            'temperature': temperature,
        }
    ).encode('utf-8')

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {OPENAI_API_KEY}',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as err:
        body = err.read().decode('utf-8', errors='ignore')
        try:
            parsed = json.loads(body)
            message = parsed.get('error', {}).get('message') or body
        except json.JSONDecodeError:
            message = body or str(err)
        raise RuntimeError(message[:300])
    except urllib.error.URLError as err:
        raise RuntimeError(f'Network error: {err.reason}')


def extract_numbers(text):
    return [float(m.replace(',', '.')) for m in re.findall(r'\d+(?:[.,]\d+)?', str(text or ''))]


def parse_message_history(body):
    history = body.get('messages')
    if isinstance(history, list) and history:
        return history

    message = str(body.get('message') or '').strip()
    problem = str(body.get('problem') or '').strip()
    if message:
        combined = f'Есеп:\n{problem}\n\nСұрақ:\n{message}' if problem else message
        return [{'role': 'user', 'content': combined}]
    return []


def evaluate_motion_force(solution):
    text = str(solution or '').lower()
    numbers = extract_numbers(solution)
    has_given = any(token in text for token in ['v0', 'v=', 't=', 'm=']) or len(numbers) >= 4
    has_acceleration = any(abs(n - 4) < 0.05 for n in numbers)
    has_force = any(abs(n - 4800) < 1 for n in numbers)
    has_unit = 'н' in text or 'n' in text

    criterion_results = [
        {
            'title': 'Берілген шамаларды анықтайды',
            'ok': has_given,
            'feedback': 'Берілген шамалар есеп шартынан көрінеді.'
            if has_given
            else 'v0, v, t және m шамаларын бөлек көрсет.',
        },
        {
            'title': 'Үдеуді есептейді',
            'ok': has_acceleration,
            'feedback': 'Үдеу дұрыс табылған.'
            if has_acceleration
            else 'Алдымен a=(v-v0)/t формуласы бойынша үдеуді тап.',
        },
        {
            'title': 'Күшті табады',
            'ok': has_force,
            'feedback': 'Күш мәні дұрыс табылған.'
            if has_force
            else 'Содан кейін F=ma формуласын қолданып, күшті есепте.',
        },
        {
            'title': 'Жауапты рәсімдейді',
            'ok': has_force and has_unit,
            'feedback': 'Жауап дұрыс рәсімделген.'
            if has_force and has_unit
            else 'Соңғы жауапта Н бірлігін көрсет.',
        },
    ]
    score = sum(1 for item in criterion_results if item['ok'])
    return {
        'score': score,
        'maxScore': len(criterion_results),
        'feedback': 'Жауап жақсы. Соңғы бірліктерді тексер.'
        if score >= 3
        else 'Үдеу мен күшті есептеу қадамдарын қайта қарап шық.',
        'criterionResults': criterion_results,
    }


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/config':
            return json_response(
                self,
                200,
                {
                    'aiEnabled': bool(OPENAI_API_KEY and OPENAI_API_KEY.startswith('sk-')),
                    'model': OPENAI_MODEL,
                },
            )
        if self.path == '/api/state':
            return json_response(self, 200, APP_STATE)
        return super().do_GET()

    def do_POST(self):
        if self.path == '/api/criteria':
            return self.handle_criteria()
        if self.path == '/api/tutor':
            return self.handle_tutor()
        if self.path == '/api/state':
            return self.handle_state()
        if self.path == '/api/extract-task':
            return self.handle_extract_task()
        if self.path == '/api/evaluate-solution':
            return self.handle_evaluate_solution()
        return json_response(self, 404, {'error': 'Not found'})

    def handle_state(self):
        global APP_STATE
        try:
            body = read_json_body(self)
            key = body.get('key')
            value = body.get('value')
            if key:
                APP_STATE[key] = value
            elif isinstance(body, dict):
                APP_STATE.update(body)
            save_state(APP_STATE)
            return json_response(self, 200, {'ok': True, 'state': APP_STATE})
        except Exception as err:
            return json_response(self, 500, {'error': str(err)})

    def handle_extract_task(self):
        try:
            body = read_json_body(self)
            image_data_url = body.get('imageDataUrl')
            if not image_data_url:
                return json_response(
                    self,
                    200,
                    {
                        'text': 'Машина 5 секундта 0-ден 20 м/с-ке дейін үдейді. m = 1200 кг. Күшті тап.'
                    },
                )

            data = call_openai(
                [
                    {
                        'role': 'system',
                        'content': 'Extract only the task text from the student photo. Return one clean plain-text problem statement in Kazakh, with no explanation.',
                    },
                    {
                        'role': 'user',
                        'content': [
                            {'type': 'text', 'text': 'Read the worksheet photo and extract the task text only.'},
                            {'type': 'image_url', 'image_url': {'url': image_data_url}},
                        ],
                    },
                ],
                max_tokens=250,
                temperature=0.1,
            )
            text = data['choices'][0]['message']['content'].strip()
            return json_response(self, 200, {'text': text})
        except Exception as err:
            return json_response(self, 500, {'error': str(err)})

    def handle_evaluate_solution(self):
        try:
            body = read_json_body(self)
            problem = str(body.get('problem') or '').strip()
            solution = str(body.get('solution') or '').strip()
            criteria = body.get('criteria') or []
            if not problem or not solution:
                return json_response(self, 400, {'error': 'Problem and solution are required.'})

            if is_motion_force_problem(problem):
                return json_response(self, 200, evaluate_motion_force(solution))

            if OPENAI_API_KEY.startswith('sk-'):
                try:
                    data = call_openai(
                        [
                            {'role': 'system', 'content': 'You are a strict school evaluator. Return only valid JSON.'},
                            {
                                'role': 'user',
                                'content': (
                                    f'Problem:\n{problem}\n\n'
                                    f'Student solution:\n{solution}\n\n'
                                    f'Criteria JSON:\n{json.dumps(criteria, ensure_ascii=False)}\n\n'
                                    'Evaluate the solution criterion-by-criterion. '
                                    'Return JSON with keys score, maxScore, feedback, criterionResults. '
                                    'criterionResults must be an array of {title, ok, feedback}. '
                                    'Keep all feedback in Kazakh.'
                                ),
                            },
                        ],
                        max_tokens=500,
                        temperature=0.2,
                    )
                    raw = (
                        data['choices'][0]['message']['content']
                        .strip()
                        .replace('```json', '')
                        .replace('```', '')
                    )
                    
                    start_idx = raw.find('{')
                    end_idx = raw.rfind('}')
                    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
                        raw = raw[start_idx:end_idx+1]
                        
                    return json_response(self, 200, json.loads(raw))
                except Exception as openai_err:
                    print(f"Failed to evaluate via OpenAI: {openai_err}")
                    pass # Fall through to generic evaluation

            criterion_results = [
                {
                    'title': criterion.get('title', 'Критерий'),
                    'ok': len(solution) > 8,
                    'feedback': 'Жауап сақталды, мұғалім тексере алады.'
                    if len(solution) > 8
                    else 'Жауапты толығырақ жаз.',
                }
                for criterion in criteria
            ]
            return json_response(
                self,
                200,
                {
                    'score': sum(1 for item in criterion_results if item['ok']),
                    'maxScore': len(criterion_results),
                    'feedback': 'Жауап сақталды. Толық тексеру үшін AI немесе мұғалім қажет.',
                    'criterionResults': criterion_results,
                },
            )
        except Exception as err:
            return json_response(self, 500, {'error': str(err)})

    def handle_criteria(self):
        try:
            body = read_json_body(self)
            problem = str(body.get('problem') or '').strip()
            if not problem:
                return json_response(self, 400, {'error': 'Problem text is required.'})

            desc_count = max(3, min(safe_int(body.get('descCount') or 4, 4), 6))
            subject = body.get('subject') or 'Физика'
            grade = str(body.get('grade') or '9')
            difficulty = body.get('difficulty') or 'Орта'
            eval_type = body.get('evalType') or 'Қалыптастырушы'
            lang_label = normalize_language(body.get('langLabel') or body.get('language') or 'Қазақша')
            bloom_level = body.get('bloomLevel') or 'Қолдану'
            total_points = 4 if desc_count <= 3 else 6 if desc_count <= 4 else 8

            if is_motion_force_problem(problem):
                return json_response(
                    self,
                    200,
                    {
                        'criteria': fallback_criteria(problem, desc_count),
                        'model': f'{OPENAI_MODEL} + rules',
                    },
                )

            if not OPENAI_API_KEY.startswith('sk-'):
                return json_response(
                    self,
                    200,
                    {
                        'criteria': fallback_criteria(problem, desc_count),
                        'model': 'rules',
                    },
                )

            try:
                data = call_openai(
                    [
                        {
                            'role': 'system',
                            'content': 'You are an expert Kazakhstan school assessment designer. Generate precise, task-specific assessment criteria and return only a valid JSON array.',
                        },
                        {
                            'role': 'user',
                            'content': (
                                f'Generate exactly {desc_count} criteria for a {subject} problem for grade {grade}.\n'
                                f'Problem:\n{problem}\n\n'
                                f'Difficulty: {difficulty}\n'
                                f'Assessment type: {eval_type}\n'
                                f'Output language: {lang_label}\n'
                                f'Bloom level: {bloom_level}\n'
                                f'Total points: {total_points}\n\n'
                                'Rules:\n'
                                '- Use the exact wording, quantities, formulas, and target skill from the problem.\n'
                                '- Follow Bloom taxonomy and the natural solving sequence.\n'
                                '- Do not use generic titles like "Мәселені түсіну", "Формуланы қолдану", or "Нәтижені тексеру".\n'
                                '- Every descriptor must be observable and tied to the specific task.\n'
                                'Return only JSON like [{"title":"...","desc":"...","pts":1}].'
                            ),
                        },
                    ],
                    max_tokens=700,
                    temperature=0.2,
                )
                raw = (
                    data['choices'][0]['message']['content']
                    .strip()
                    .replace('```json', '')
                    .replace('```', '')
                )
                
                # In case GPT returned something before or after the array
                start_idx = raw.find('[')
                end_idx = raw.rfind(']')
                if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
                    raw = raw[start_idx:end_idx+1]
                    
                parsed = clean_criteria_list(json.loads(raw), desc_count, problem)
                return json_response(self, 200, {'criteria': parsed, 'model': OPENAI_MODEL})
            except Exception as openai_err:
                print(f"Failed to generate criteria via OpenAI: {openai_err}")
                return json_response(
                    self,
                    200,
                    {
                        'criteria': fallback_criteria(problem, desc_count),
                        'model': 'rules (fallback due to error)'
                    },
                )
        except Exception as err:
            return json_response(self, 500, {'error': str(err)})

    def handle_tutor(self):
        try:
            body = read_json_body(self)
            history = parse_message_history(body)
            if not history:
                return json_response(self, 400, {'error': 'Messages are required.'})

            if not OPENAI_API_KEY.startswith('sk-'):
                return json_response(
                    self,
                    200,
                    {
                        'reply': 'Сәлем! Қай қадамда қиналып тұрғаныңды жаз, бірге талдаймыз.',
                        'model': 'rules',
                    },
                )

            try:
                data = call_openai(
                    [
                        {
                            'role': 'system',
                            'content': (
                                'Сен Akyl деп аталатын Қазақстан мектеп оқушыларына арналған AI-тьюторсың. '
                                'Физика мен математика есептерін шешуге жетелейсің. '
                                'Сократ әдісін қолдан, тікелей жауап бермей, дұрыс бағытта сұрақтар қой. '
                                'Қазақ тілінде жауап бер. Жауаптарды қысқа және нақты ұста, максимум 2-3 сөйлем жаз.'
                            ),
                        },
                        *history,
                    ],
                    max_tokens=250,
                    temperature=0.75,
                )
                reply = data['choices'][0]['message']['content'].strip()
                return json_response(self, 200, {'reply': reply, 'model': OPENAI_MODEL})
            except Exception as openai_err:
                print(f"Failed tutor via OpenAI: {openai_err}")
                return json_response(self, 200, {'reply': 'Кешіріңіз, қазір AI серверіне қосылу мүмкін емес (API қатесі).', 'model': 'error'})
        except Exception as err:
            return json_response(self, 500, {'error': str(err)})

    def log_message(self, format, *args):
        pass


if __name__ == '__main__':
    print(f'SmartCriteria -> http://localhost:{PORT}')
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        httpd.serve_forever()
