from flask import Flask
from flask_cors import CORS
from config import Config
from database import db
from routes.movies import movies_bp
from routes.ratings import ratings_bp
from dotenv import load_dotenv

load_dotenv()

def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)

  CORS(app)
  db.init_app(app)

  app.register_blueprint(movies_bp)
  app.register_blueprint(ratings_bp)

  with app.app_context():
      db.create_all()

  return app

app = create_app()

@app.route("/api/health")
def health():
  return {"status": "ok"}

if __name__ == "__main__":
  app.run(debug=True)
