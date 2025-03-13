import os
from flag import create_app

app = create_app()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

if __name__ == '__main__':
    cert_path = os.path.join(BASE_DIR, "flag", "cert.pem")
    key_path = os.path.join(BASE_DIR, "flag", "key.pem")

    print(f"Using SSL cert: {cert_path}, key: {key_path}") 

    app.run(host='0.0.0.0', port=5000, ssl_context=(cert_path, key_path))
