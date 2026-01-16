from flask import Flask, current_app
from flask_cors import CORS
import jwt
from config import Config
from database import db
from routes.auth import auth_bp
from routes.movies import movies_bp
from routes.ratings import ratings_bp
from dotenv import load_dotenv

load_dotenv()

def decode_token(token: str):
  return jwt.decode(
    token,
    current_app.config["SECRET_KEY"],
    algorithms=["HS256"],
    options={"verify_exp": True}
  )

def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)

  CORS(app,
      supports_credentials=True,
      origins=["http://localhost:5173"],
      allow_headers=["Content-Type", "Authorization"],
      expose_headers=["Set-Cookie"])
  
  db.init_app(app)

  app.register_blueprint(auth_bp) 
  app.register_blueprint(movies_bp)
  app.register_blueprint(ratings_bp)

  with app.app_context():
      db.create_all()

  return app

app = create_app()

# rota para testar o status da aplicação
@app.route("/api/health")
def health():
  return {"status": "ok"}

if __name__ == "__main__":
  app.run(debug=True)
