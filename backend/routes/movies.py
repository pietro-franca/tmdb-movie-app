from flask import Blueprint, request, jsonify
from services.tmdb_service import (
  search_movies,
  get_movie_details,
  get_movie_credits
)

movies_bp = Blueprint("movies", __name__, url_prefix="/api")

# retorna lista de filmes em páginas 
# -> necessário pro scroll infinito
@movies_bp.route("/search")
def search():
  query = request.args.get("query")
  page = request.args.get("page", 1)

  if not query:
    return jsonify({"error": "Query é obrigatória"}), 400

  try:
    data = search_movies(query, page)
    return jsonify(data)
  except Exception as e:
    return jsonify({"error": str(e)}), 500

@movies_bp.route("/movie/<int:movie_id>")
def movie_details(movie_id):
  try:
    details = get_movie_details(movie_id)
    credits = get_movie_credits(movie_id)

    return jsonify({
      "details": details,
      "credits": credits.get("cast", [])
    })
  except Exception as e:
    return jsonify({"error": str(e)}), 500
