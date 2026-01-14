from flask import Blueprint, request, jsonify
from database import db
from models import MovieRating

ratings_bp = Blueprint("ratings", __name__, url_prefix="/api/ratings")

@ratings_bp.route("", methods=["GET"])
def get_ratings():
    ratings = MovieRating.query.all()
    return jsonify([
        {
            "tmdb_id": r.tmdb_id,
            "title": r.title,
            "poster_path": r.poster_path,
            "rating": r.rating
        }
        for r in ratings
    ])

@ratings_bp.route("/<int:tmdb_id>", methods=["GET"])
def get_rating(tmdb_id):
    rating = MovieRating.query.filter_by(tmdb_id=tmdb_id).first()

    if not rating:
        return jsonify(None), 200

    return jsonify({
        "tmdb_id": rating.tmdb_id,
        "rating": rating.rating
    })


@ratings_bp.route("", methods=["POST"])
def create_rating():
    data = request.json

    existing = MovieRating.query.filter_by(tmdb_id=data["tmdb_id"]).first()
    if existing:
        return jsonify({"error": "Filme já avaliado"}), 400

    if not 1 <= data["rating"] <= 5:
        return jsonify({"error": "Nota deve ser entre 1 e 5"}), 400


    rating = MovieRating(
        tmdb_id=data["tmdb_id"],
        title=data["title"],
        poster_path=data.get("poster_path"),
        rating=data["rating"]
    )

    db.session.add(rating)
    db.session.commit()

    return jsonify({"message": "Avaliação criada"}), 201

@ratings_bp.route("/<int:tmdb_id>", methods=["PUT"])
def update_rating(tmdb_id):
    data = request.json
    rating = MovieRating.query.filter_by(tmdb_id=tmdb_id).first_or_404()

    rating.rating = data["rating"]
    db.session.commit()

    return jsonify({"message": "Avaliação atualizada"})

@ratings_bp.route("/<int:tmdb_id>", methods=["DELETE"])
def delete_rating(tmdb_id):
    rating = MovieRating.query.filter_by(tmdb_id=tmdb_id).first_or_404()

    db.session.delete(rating)
    db.session.commit()

    return jsonify({"message": "Avaliação removida"})
