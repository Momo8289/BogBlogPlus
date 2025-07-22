from flask import request, jsonify

from app.api import bp
from app.api.errors import bad_request, unauthorized
from app.auth import protected
from app.models import User, Token
from app import db

@bp.post("/token/login")
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username or not password:
        return bad_request("username and password required")

    user: User | None = User.query.where(User.username == username).first()

    if not user:
        return unauthorized("username or password incorrect")

    if not user.check_password(password):
        return unauthorized("username or password incorrect")

    token = Token(user=user)
    db.session.add(token)
    db.session.commit()

    return jsonify({"token": token.token, "expires": token.expires})


@bp.post("/token/logout")
@protected
def logout(token: Token):
    db.session.delete(token)
    db.session.commit()

    return "", 204