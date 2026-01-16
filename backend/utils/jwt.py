import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app, jsonify, request
from functools import wraps
from models.user import User
import logging

logger = logging.getLogger(__name__)

def generate_token(user_id: int):
  payload = {
    "sub": str(user_id),
    "exp": datetime.now(timezone.utc) + timedelta(days=7),
    "iat": datetime.now(timezone.utc)
  }

  return jwt.encode(
    payload, 
    current_app.config["SECRET_KEY"], 
    algorithm="HS256"
  )

def decode_token(token: str):
  return jwt.decode(
    token,
    current_app.config["SECRET_KEY"],
    algorithms=["HS256"],
    options={"verify_exp": True}
  )

# decorator usado para proteger rotas da API
# verifica se o token JWT está presente na requisição e se é válido
# uma vez verificado, o usuário em questão fica autenticado por 7 dias
def jwt_required(fn):
  @wraps(fn)
  def wrapper(*args, **kwargs):
    token = request.cookies.get("access_token")

    if not token:
      return {"error": "Não autenticado"}, 401

    try:
      payload = decode_token(token)
      
      user_id_str = payload.get("sub")

      try:
        user_id = int(user_id_str)
      except ValueError:
        return jsonify({"error": "ID de usuário inválido"}), 401

      exp_timestamp = payload.get("exp")
      if exp_timestamp:
        current_timestamp = datetime.now(timezone.utc).timestamp()
        logger.info(f"Expiração: {exp_timestamp}, Atual: {current_timestamp}")
        
        if exp_timestamp < current_timestamp:
          return jsonify({"error": "Token expirado"}), 401

      user = User.query.get(user_id)
      
      if not user:
        return {"error": "Usuário inválido"}, 401

      request.user = user
      
    except jwt.ExpiredSignatureError as e:
      return jsonify({"error": "Token expirado"}), 401
    except jwt.InvalidTokenError as e:
      return jsonify({"error": f"Token inválido: {str(e)}"}), 401
    except Exception as e:
      return jsonify({"error": f"Erro na autenticação: {str(e)}"}), 401

    return fn(*args, **kwargs)

  return wrapper