import requests
from config import Config

headers = {
  "Authorization": f"Bearer {Config.TMDB_API_KEY}",
  "Content-Type": "application/json"
}

def search_movies(query, page=1):
  url = f"{Config.TMDB_BASE_URL}/search/movie"
  params = {"query": query, "page": page}
  response = requests.get(url, headers=headers, params=params)
  response.raise_for_status()
  return response.json()

def get_movie_details(movie_id):
  url = f"{Config.TMDB_BASE_URL}/movie/{movie_id}"
  response = requests.get(url, headers=headers)
  response.raise_for_status()
  return response.json()

def get_movie_credits(movie_id):
  url = f"{Config.TMDB_BASE_URL}/movie/{movie_id}/credits"
  response = requests.get(url, headers=headers)
  response.raise_for_status()
  return response.json()
