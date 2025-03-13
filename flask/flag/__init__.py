import os
from flask import Flask
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .views import main_views
    app.register_blueprint(main_views.bp)

    return app

if __name__ == '__main__':
    app = create_app()

    cert_path = os.path.join(BASE_DIR, "cert.pem")
    key_path = os.path.join(BASE_DIR, "key.pem")

    print(f"Using SSL cert: {cert_path}, key: {key_path}")

    app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))