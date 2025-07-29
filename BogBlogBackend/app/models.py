from typing import Optional
from datetime import datetime, timezone, timedelta
from secrets import token_hex
from flask_login import UserMixin
import sqlalchemy as sa
import sqlalchemy.orm as so
from werkzeug.security import generate_password_hash, check_password_hash

from app import db




class User(db.Model , UserMixin):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc),
                                                      nullable=True)

    posts: so.WriteOnlyMapped["Post"] = so.relationship(back_populates="author", passive_deletes=True)
    comments: so.WriteOnlyMapped["Comment"] = so.relationship(back_populates="author", passive_deletes=True)
    tokens: so.WriteOnlyMapped["Token"] = so.relationship(back_populates="user", passive_deletes=True)
    likes: so.WriteOnlyMapped["Post"] = so.relationship("Post", secondary="like_user_post", back_populates="likes", passive_deletes=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def json_repr(self):
        return {
            "id": self.id,
            "username": self.username,
            "created_on": self.timestamp
        }

    def __repr__(self):
        return f"<User '{self.username}' ({self.id})>"


class Post(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    title: so.Mapped[str] = so.mapped_column(sa.String(100), index=True)
    body: so.Mapped[str] = so.mapped_column(sa.String(2000))
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))

    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id), index=True)
    author: so.Mapped[User] = so.relationship(back_populates="posts")
    comments: so.WriteOnlyMapped["Comment"] = so.relationship(back_populates="post", passive_deletes=True)
    likes: so.WriteOnlyMapped["User"] = so.relationship("User", secondary="like_user_post", back_populates="likes", passive_deletes=True)

    def json_repr(self, viewer: User = None):
        out = {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "timestamp": self.timestamp,
            "author": self.author.json_repr(),
            "likes": Like.query.where(Like.post_id == self.id).count()
        }
        if viewer:
            out["liked"] = True if Like.query.where(
                Like.post_id == self.id, Like.user_id == viewer.id).first() else False

        return out

    def __repr__(self):
        return f"<Post '{self.title}' ({self.id})>"


class Comment(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    body: so.Mapped[str] = so.mapped_column(sa.String(500))
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))

    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id), index=True)
    post_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Post.id), index=True)
    author: so.Mapped[User] = so.relationship(back_populates="comments")
    post: so.Mapped[Post] = so.relationship(back_populates="comments")

    def __repr__(self):
        return f"<Comment {self.id} on post {self.post_id}>"


class Token(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    expires: so.Mapped[datetime] = so.mapped_column(index=True,
                                                    default=lambda: datetime.now(timezone.utc) + timedelta(days=7))
    token: so.Mapped[str] = so.mapped_column(sa.String(256), default=lambda: token_hex(256 // 2))

    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id), index=True)
    user: so.Mapped[User] = so.relationship(back_populates="tokens")

    def is_expired(self):
        return datetime.now(timezone.utc) > self.expires.replace(tzinfo=timezone.utc)

    def __repr__(self):
        return f"<Token for user {self.user_id}. Expires {self.expires}>"


class Like(db.Model):
    __tablename__ = "like_user_post"
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id))
    post_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Post.id))

from app import login

@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
