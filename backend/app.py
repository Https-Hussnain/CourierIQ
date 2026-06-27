from flask import Flask
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

from routes.auth import auth_bp
from routes.upload import upload_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(upload_bp, url_prefix='/api')

@app.route('/')
def index():
    return {'message': 'CourierIQ API is running!'}

if __name__ == '__main__':
    app.run(debug=True)