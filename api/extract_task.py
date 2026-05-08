from http.server import BaseHTTPRequestHandler
from _shared import json_resp, read_body, call_openai


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            body = read_body(self)
            image_url = body.get('imageDataUrl')
            if not image_url:
                return json_resp(self, 200, {
                    'text': 'Машина 5 секундта 0-ден 20 м/с-ке дейін үдейді. m = 1200 кг. Күшті тап.'
                })
            data = call_openai([
                {'role': 'system', 'content': 'Extract only the task text from the student photo. Return one clean plain-text problem statement in Kazakh, with no explanation.'},
                {'role': 'user', 'content': [
                    {'type': 'text', 'text': 'Read the worksheet photo and extract the task text only.'},
                    {'type': 'image_url', 'image_url': {'url': image_url}},
                ]},
            ], max_tokens=250, temperature=0.1)
            text = data['choices'][0]['message']['content'].strip()
            json_resp(self, 200, {'text': text})
        except Exception as err:
            json_resp(self, 500, {'error': str(err)})

    def log_message(self, *a):
        pass
