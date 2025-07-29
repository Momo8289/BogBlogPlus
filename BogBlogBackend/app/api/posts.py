from flask import request, jsonify

from app import db
from app.api import bp
from app.api.errors import bad_request, forbidden
from app.auth import protected
from app.models import Post, User, Like


@bp.get("/post")
@protected
def get_posts(token):
    return jsonify({"posts": [p.json_repr(token.user) for p in Post.query.order_by(Post.timestamp.desc()).all()]})


@bp.post("/post")
@protected
def create_post(token):
    user: User = token.user
    data = request.json

    title = data.get("title")
    body = data.get("body")

    if not title or not body:
        return bad_request("title and body are required")

    post = Post(author=user, title=str(title), body=str(body))
    db.session.add(post)
    db.session.commit()

    response = jsonify(post.json_repr())
    response.status_code = 201
    return response


@bp.get("/post/<id>")
@protected
def get_post(token, id):
    return jsonify(Post.query.get_or_404(id).json_repr(token.user))

@bp.put("/post/<id>")
@protected
def update_post(token, id):
    user: User = token.user
    post = Post.query.get_or_404(id)
    data = request.json

    if post.author != user:
        return forbidden("Only the post author can make changes to a post")

    if not (body := data.get("body")):
        return bad_request("must include body")

    post.body = str(body)
    db.session.commit()

    return jsonify(post.json_repr(user))


@bp.delete("/post/<id>")
@protected
def delete_post(token, id):
    user: User = token.user
    post = Post.query.get_or_404(id)

    if post.author != user:
        return forbidden("Only the post author can delete the post")

    db.session.delete(post)
    db.session.commit()

    return "", 204

@bp.post("/post/<id>/like")
@protected
def like_post(token, id):
    user: User = token.user
    post = Post.query.get_or_404(id)

    if post.author == user:
        return forbidden("Cannot like your own post")

    if Like.query.where(Like.post_id == post.id, Like.user_id == user.id).first():
        return "", 204

    user.likes.add(post)
    db.session.commit()

    return jsonify(post.json_repr(user))


@bp.delete("/post/<id>/like")
@protected
def unlike_post(token, id):
    user: User = token.user
    post = Post.query.get_or_404(id)

    if post.author == user:
        return forbidden("Cannot unlike your own post")

    if not Like.query.where(Like.post_id == post.id, Like.user_id == user.id).first():
        return "", 204

    user.likes.remove(post)
    db.session.commit()

    return "", 204