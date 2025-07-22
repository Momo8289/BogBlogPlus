from flask import Blueprint


bp = Blueprint("api", __name__)

from app.api import comments, errors, posts, tokens, users