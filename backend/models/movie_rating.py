from database import db

class MovieRating(db.Model):
  __tablename__ = "movie_ratings"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  tmdb_id = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String(255), nullable=False)
  poster_path = db.Column(db.String(255))
  rating = db.Column(db.Integer, nullable=False)
  overview = db.Column(db.String(255))

  __table_args__ = (
      db.UniqueConstraint("user_id", "tmdb_id", name="unique_user_movie"),
  )
