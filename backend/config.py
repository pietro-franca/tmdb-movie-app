import os

class Config:
  SQLALCHEMY_DATABASE_URI = "sqlite:///movies.db"
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  TMDB_API_KEY = os.getenv("TMDB_API_KEY")
  TMDB_BASE_URL = "https://api.themoviedb.org/3"
