from flask import request, jsonify

from app import db
from app.api import bp
from app.api.errors import bad_request, not_found, forbidden
from app.auth import protected
from app.models import User, Token, Post, Like


@bp.get("/user")
@protected
def current_user(token):
    return jsonify(token.user.json_repr())


@bp.post("/user")
def register():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username or not password:
        return bad_request("username and password required")

    if User.query.where(User.username == username).first():
        return bad_request(f"Username '{username}' is already in use")

    if len(password) < 8:
        return bad_request(f"Password must be at least 8 characters")

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)

    token = Token(user=user)
    db.session.add(token)
    db.session.commit()

    response = jsonify({"token": token.token, "expires": token.expires})
    response.status_code = 201

    return response


@bp.put("/user")
@protected
def update_user(token):
    user: User = token.user
    data = request.json

    if username := data.get("username"):
        if user.username == username:
            return bad_request("username must be different than current username")

        if User.query.where(User.username == username).first():
            return bad_request(f"Username '{username}' is already in use")

        user.username = username

    if password := data.get("password"):
        if not (new_password := data.get("new_password")):
            return bad_request("Missing new_password")

        if not user.check_password(password):
            return forbidden("Incorrect password")

        if password == new_password:
            return bad_request("New password must be different from the old password")

        user.set_password(new_password)

        for t in db.session.scalars(user.tokens.select()):
            if t != token:
                db.session.delete(t)

    db.session.commit()

    return jsonify(user.json_repr())


@bp.delete("/user")
@protected
def delete_user(token: Token):
    user: User = token.user

    for t in Token.query.where(Token.user_id == user.id).all():
        db.session.delete(t)

    for like in Like.query.where(Like.user_id == user.id).all():
        db.session.delete(like)

    for post in Post.query.where(Post.user_id == user.id).all():
        for like in Like.query.where(Like.post_id == post.id).all():
            db.session.delete(like)
        db.session.delete(post)

    db.session.delete(user)
    db.session.commit()

    return "", 204


@bp.get("/user/<id>")
@protected
def get_user(_, id):
    user: User = User.query.get(id)

    if not user:
        return not_found("User not found")

    return jsonify(user.json_repr())


@bp.get("/user/<id>/posts")
@protected
def user_posts(token, id):
    target: User = User.query.get(id)

    if not target:
        return not_found("User not found")

    user: User = token.user

    posts = [p.json_repr(user) for p in db.session.scalars(target.posts.select().order_by(Post.timestamp.desc()))]

    return jsonify(posts)


@bp.get("/user/<id>/likes")
@protected
def user_likes(token, id):
    target: User = User.query.get(id)

    if not target:
        return not_found("User not found")

    user: User = token.user

    posts = [p.json_repr(user) for p in db.session.scalars(target.likes.select().order_by(Post.timestamp.desc()))]

    return jsonify(posts)
