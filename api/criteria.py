import json
from http.server import BaseHTTPRequestHandler
from _shared import (
    json_resp, read_body, safe_int, call_openai, OPENAI_API_KEY, OPENAI_MODEL,
    is_motion_force_problem, normalize_language, clean_criteria, fallback_criteria,
)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            body = read_body(self)
            problem = str(body.get('problem') or '').strip()
            if not problem:
                return json_resp(self, 400, {'error': 'Problem text is required.'})

            count = max(3, min(safe_int(body.get('descCount') or 4, 4), 6))
            subject = body.get('subject') or 'Физика'
            grade = str(body.get('grade') or '9')
            difficulty = body.get('difficulty') or 'Орта'
            eval_type = body.get('evalType') or 'Қалыптастырушы'
            lang = normalize_language(body.get('langLabel') or body.get('language') or 'Қазақша')
            bloom = body.get('bloomLevel') or 'Қолдану'
            total_pts = 4 if count <= 3 else 6 if count <= 4 else 8

            if is_motion_force_problem(problem):
                return json_resp(self, 200, {
                    'criteria': fallback_criteria(problem, count),
                    'model': f'{OPENAI_MODEL} + rules',
                })

            if not OPENAI_API_KEY.startswith('sk-'):
                return json_resp(self, 200, {'criteria': fallback_criteria(problem, count), 'model': 'rules'})

            try:
                data = call_openai([
                    {'role': 'system', 'content': 'You are an expert Kazakhstan school assessment designer. Generate precise, task-specific assessment criteria and return only a valid JSON array.'},
                    {'role': 'user', 'content': (
                        f'Generate exactly {count} criteria for a {subject} problem for grade {grade}.\n'
                        f'Problem:\n{problem}\n\nDifficulty: {difficulty}\nAssessment type: {eval_type}\n'
                        f'Output language: {lang}\nBloom level: {bloom}\nTotal points: {total_pts}\n\n'
                        'Rules:\n- Use exact wording and quantities from the problem.\n'
                        '- Do not use generic titles.\n- Every descriptor must be observable.\n'
                        'Return only JSON like [{"title":"...","desc":"...","pts":1}].'
                    )},
                ], max_tokens=700, temperature=0.2)
                raw = data['choices'][0]['message']['content'].strip().replace('```json', '').replace('```', '')
                s, e = raw.find('['), raw.rfind(']')
                if s != -1 and e > s:
                    raw = raw[s:e+1]
                parsed = clean_criteria(json.loads(raw), count, problem)
                return json_resp(self, 200, {'criteria': parsed, 'model': OPENAI_MODEL})
            except Exception as err:
                print(f'criteria openai error: {err}')
                return json_resp(self, 200, {'criteria': fallback_criteria(problem, count), 'model': 'rules'})
        except Exception as err:
            json_resp(self, 500, {'error': str(err)})

    def log_message(self, *a):
        pass
