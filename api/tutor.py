from http.server import BaseHTTPRequestHandler
from _shared import json_resp, read_body, call_openai, OPENAI_API_KEY, OPENAI_MODEL


def parse_history(body):
    history = body.get('messages')
    if isinstance(history, list) and history:
        return history
    message = str(body.get('message') or '').strip()
    problem = str(body.get('problem') or '').strip()
    if message:
        combined = f'Есеп:\n{problem}\n\nСұрақ:\n{message}' if problem else message
        return [{'role': 'user', 'content': combined}]
    return []


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            body = read_body(self)
            history = parse_history(body)
            if not history:
                return json_resp(self, 400, {'error': 'Messages are required.'})
            if not OPENAI_API_KEY.startswith('sk-'):
                return json_resp(self, 200, {'reply': 'Сәлем! Қай қадамда қиналып тұрғаныңды жаз, бірге талдаймыз.', 'model': 'rules'})
            try:
                data = call_openai([
                    {'role': 'system', 'content': (
                        'Сен Akyl деп аталатын Қазақстан мектеп оқушыларына арналған AI-тьюторсың. '
                        'Физика мен математика есептерін шешуге жетелейсің. '
                        'Сократ әдісін қолдан. Қазақ тілінде жауап бер. Максимум 2-3 сөйлем.'
                    )},
                    *history,
                ], max_tokens=250, temperature=0.75)
                reply = data['choices'][0]['message']['content'].strip()
                json_resp(self, 200, {'reply': reply, 'model': OPENAI_MODEL})
            except Exception as err:
                json_resp(self, 200, {'reply': 'Кешіріңіз, қазір AI серверіне қосылу мүмкін емес.', 'model': 'error'})
        except Exception as err:
            json_resp(self, 500, {'error': str(err)})

    def log_message(self, *a):
        pass
