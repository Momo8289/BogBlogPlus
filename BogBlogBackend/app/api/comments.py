from flask import request, jsonify

from app import db
from app.api import bp
from app.api.errors import bad_request, not_found, forbidden
from app.auth import protected
from app.models import Comment, User, Post


@bp.post("/comment")
@protected
def new_comment(token):
    user: User = token.user
    data = request.json

    if not (post_id := data.get("post_id")):
        return bad_request("Missing post_id")

    if not (body := data.get("body")):
        return bad_request("Missing body")

    if not (post := Post.query.get_or_404(post_id)):
        return not_found("Post not found")

    comment = Comment(author=user, body=body, post=post, user_id=user.id)

    db.session.add(comment)
    db.session.commit()

    response = jsonify(comment.json_repr())
    response.status_code = 201
    return response


@bp.get("/comment/<id>")
@protected
def get_comment(_, id):
    return Comment.query.get_or_404(id).json_repr()


@bp.put("/comment/<id>")
@protected
def edit_comment(token, id):
    user: User = token.user
    data = request.json

    if not (body := data.get("body")):
        return bad_request("Missing body")

    comment = Comment.query.get_or_404(id)

    if comment.user_id != user.id:
        return forbidden("Only the author can edit the post")

    comment.body = body

    db.session.commit()

    return jsonify(comment.json_repr())


@bp.delete("/comment/<id>")
@protected
def delete_comment(token, id):
    user: User = token.user
    comment: Comment = Comment.query.get_or_404(id)

    if comment.user_id != user.id:
        return forbidden("Only the author can delete the post")

    db.session.delete(comment)
    db.session.commit()

    return "", 204

