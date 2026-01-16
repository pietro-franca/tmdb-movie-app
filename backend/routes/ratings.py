from flask import Blueprint, request, jsonify, g
from database import db
from models.movie_rating import MovieRating
from utils.jwt import jwt_required

ratings_bp = Blueprint("ratings", __name__, url_prefix="/api/ratings")

@ratings_bp.route("", methods=["GET"])
@jwt_required
def get_ratings():
    user = request.user

    ratings = MovieRating.query.filter_by(user_id=user.id).all()
    return jsonify([
        {
            "tmdb_id": r.tmdb_id,
            "title": r.title,
            "poster_path": r.poster_path,
            "rating": r.rating,
            "overview": r.overview
        }
        for r in ratings
    ])

@ratings_bp.route("", methods=["POST"])
@jwt_required
def create_rating():
    user = request.user
    data = request.json

    existing = MovieRating.query.filter_by(
        user_id=user.id,
        tmdb_id=data["tmdb_id"]
    ).first()

    if existing:
        existing.rating = data["rating"]
    else:
        rating = MovieRating(
            user_id=user.id,
            tmdb_id=data["tmdb_id"],
            title=data["title"],
            poster_path=data.get("poster_path"),
            rating=data["rating"],
            overview=data["overview"]
        )
        db.session.add(rating)
        
    db.session.commit()

    return jsonify({"message": "Avaliação salva com sucesso"}), 200

@ratings_bp.route("/<int:tmdb_id>", methods=["PUT"])
@jwt_required
def update_rating(tmdb_id):
    user = request.user  
    data = request.json

    if not data or "rating" not in data:
        return jsonify({"error": "Rating é obrigatório"}), 400
    
    rating = MovieRating.query.filter_by(
        tmdb_id=tmdb_id, 
        user_id=user.id  
    ).first()

    if not rating:
        return jsonify({"error": "Avaliação não encontrada"}), 404

    rating.rating = data["rating"]
    db.session.commit()

    return jsonify({"message": "Avaliação atualizada"})

@ratings_bp.route("/<int:tmdb_id>", methods=["DELETE"])
@jwt_required
def delete_rating(tmdb_id):
    user = request.user

    rating = MovieRating.query.filter_by(
        tmdb_id=tmdb_id,
        user_id=user.id  
    ).first()

    if not rating:
        return jsonify({"error": "Avaliação não encontrada"}), 404

    db.session.delete(rating)
    db.session.commit()

    return jsonify({"message": "Avaliação removida"})