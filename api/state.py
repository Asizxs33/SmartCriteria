import json
from http.server import BaseHTTPRequestHandler
from _shared import json_resp, read_body, load_state, save_state


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        json_resp(self, 200, load_state())

    def do_POST(self):
        try:
            body = read_body(self)
            state = load_state()
            key = body.get('key')
            value = body.get('value')
            if key:
                state[key] = value
            elif isinstance(body, dict):
                state.update(body)
            save_state(state)
            json_resp(self, 200, {'ok': True, 'state': state})
        except Exception as err:
            json_resp(self, 500, {'error': str(err)})

    def log_message(self, *a):
        pass
