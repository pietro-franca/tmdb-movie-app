from database import db
from datetime import datetime, timezone

class MovieRating(db.Model):
  __tablename__ = "movie_ratings"

  id = db.Column(db.Integer, primary_key=True)
  tmdb_id = db.Column(db.Integer, unique=True, nullable=False)
  title = db.Column(db.String(255), nullable=False)
  poster_path = db.Column(db.String(255))
  rating = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(
    db.DateTime,
    default=datetime.now(timezone.utc),
    onupdate=datetime.now(timezone.utc)
  )
