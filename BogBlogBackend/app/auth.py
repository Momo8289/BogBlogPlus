from functools import wraps

from flask import request

from app.api.errors import unauthorized
from app.models import Token
from app import db


def protected(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        auth: str = request.headers.get("Authorization")

        if not auth:
            return unauthorized("Missing Authorization header")

        token_str = auth.lstrip("Bearer ")

        token: Token = Token.query.where(Token.token == token_str).first()

        if not token:
            return unauthorized("Invalid token")

        if token.is_expired():
            db.session.delete(token)
            db.session.commit()
            return unauthorized("Invalid token")

        return func(token, *args, **kwargs)

    return wrapper
