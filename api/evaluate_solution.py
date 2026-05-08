import json
from http.server import BaseHTTPRequestHandler
from _shared import (
    json_resp, read_body, call_openai, OPENAI_API_KEY,
    is_motion_force_problem, evaluate_motion_force,
)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            body = read_body(self)
            problem = str(body.get('problem') or '').strip()
            solution = str(body.get('solution') or '').strip()
            criteria = body.get('criteria') or []
            if not problem or not solution:
                return json_resp(self, 400, {'error': 'Problem and solution are required.'})

            if is_motion_force_problem(problem):
                return json_resp(self, 200, evaluate_motion_force(solution))

            if OPENAI_API_KEY.startswith('sk-'):
                try:
                    data = call_openai([
                        {'role': 'system', 'content': 'You are a strict school evaluator. Return only valid JSON.'},
                        {'role': 'user', 'content': (
                            f'Problem:\n{problem}\n\nStudent solution:\n{solution}\n\n'
                            f'Criteria JSON:\n{json.dumps(criteria, ensure_ascii=False)}\n\n'
                            'Evaluate criterion-by-criterion. Return JSON with keys score, maxScore, feedback, criterionResults. '
                            'criterionResults must be [{title, ok, feedback}]. Keep feedback in Kazakh.'
                        )},
                    ], max_tokens=500, temperature=0.2)
                    raw = data['choices'][0]['message']['content'].strip().replace('```json', '').replace('```', '')
                    s, e = raw.find('{'), raw.rfind('}')
                    if s != -1 and e > s:
                        return json_resp(self, 200, json.loads(raw[s:e+1]))
                except Exception as err:
                    print(f'evaluate openai error: {err}')

            results = [
                {'title': c.get('title', 'Критерий'), 'ok': len(solution) > 8,
                 'feedback': 'Жауап сақталды.' if len(solution) > 8 else 'Жауапты толығырақ жаз.'}
                for c in criteria
            ]
            json_resp(self, 200, {
                'score': sum(1 for r in results if r['ok']),
                'maxScore': len(results),
                'feedback': 'Жауап сақталды. Толық тексеру үшін мұғалім қажет.',
                'criterionResults': results,
            })
        except Exception as err:
            json_resp(self, 500, {'error': str(err)})

    def log_message(self, *a):
        pass
