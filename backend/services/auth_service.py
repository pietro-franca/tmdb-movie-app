from models.user import User
from database import db
from utils.security import hash_password, verify_password
from utils.jwt import generate_token

def register_user(username: str, email: str, password: str):
    if User.query.filter_by(email=email).first():
        raise ValueError("Usuário já existe")

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password)
    )

    db.session.add(user)
    db.session.commit()

    return user


def authenticate_user(email: str, password: str):
    user = User.query.filter_by(email=email).first()

    if not user or not verify_password(password, user.password_hash):
        raise ValueError("Credenciais inválidas")

    token = generate_token(user.id)
    return token, user
