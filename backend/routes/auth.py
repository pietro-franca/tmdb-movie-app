from flask import Blueprint, request, jsonify, make_response, g
from services.auth_service import register_user, authenticate_user
from utils.jwt import jwt_required

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
  data = request.json

  try:
    register_user(data["username"], data["email"], data["password"])
    return jsonify({"message": "Usuário criado"}), 201
  except ValueError as e:
    return jsonify({"error": str(e)}), 400


@auth_bp.route("/login", methods=["POST"])
def login():
  data = request.json
  
  try:
    token, user = authenticate_user(data["email"], data["password"])
    
    response = make_response({
      "id": user.id,
      "username": user.username,
      "email": user.email
    })

    response.set_cookie(
      "access_token",
      token,
      httponly=True,
      samesite="Lax",
      path="/"
    )

    return response
  
  except ValueError as e:
    return jsonify({"error": str(e)}), 401

# retorna as informações do usuário autenticado
@auth_bp.route("/me", methods=["GET"])
@jwt_required
def me():
  user = request.user

  return jsonify({
    "id": user.id,
    "username": user.username,
    "email": user.email
  })


@auth_bp.route("/logout", methods=["POST"])
def logout():
  response = make_response({"message": "Logout efetuado"})
  response.delete_cookie("access_token")
  return response

