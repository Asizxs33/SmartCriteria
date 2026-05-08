from http.server import BaseHTTPRequestHandler
from _shared import OPENAI_API_KEY, OPENAI_MODEL, json_resp


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        json_resp(self, 200, {
            'aiEnabled': bool(OPENAI_API_KEY and OPENAI_API_KEY.startswith('sk-')),
            'model': OPENAI_MODEL,
        })

    def log_message(self, *a):
        pass
