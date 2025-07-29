from flask import Blueprint, render_template, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Post

bp = Blueprint('main', __name__)



@bp.route('/')
def index():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    return render_template("index.jinja2", posts=posts)


@bp.route("/users/<username>")
@login_required
def user_profile(username: str):
    user = User.from_username(username)

    if not user:
        return "", 404

    return render_template("profile.jinja2", user=user,
                           posts=sorted(user.posts, reverse=True, key=lambda p: p.created_on))


@bp.route("/post", methods=["GET", "POST"])
@login_required
def create_post():
    if request.method == "POST":
        title = request.form.get("title")
        body = request.form.get("body")

        if not (title and body):
            return render_template("new_post.jinja2")

        post = Post.insert(title, body, current_user.id)
        return redirect(f"/post/{post.id}")

    return render_template("new_post.jinja2")


@bp.route("/post/<post_id>")
def view_post(post_id: int):
    post = Post.get(post_id)
    if not post:
        return "", 404

    return render_template("post.jinja2", post=post)


@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not (username and password):
            return render_template("login.jinja2", error="Username and password required")

        user = User.from_username(username)

        if not user or user.password != password:
            return render_template("login.jinja2", error="Username or password is incorrect")

        login_user(user, remember=bool(request.form.get("remember")))
        return redirect(request.args.get("next", "/"))

    return render_template("login.jinja2")


@bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        print(username, email, password)

        if not (username and password and email):
            return render_template("register.jinja2", error="Username, email, and password required")

        if User.from_username(username):
            return render_template("register.jinja2", error="Username already in use")

        if User.from_email(email):
            return render_template("register.jinja2", error="Email already in use")

        user = User.insert(username, email, password)
        login_user(user)

        return redirect("/")

    return render_template("register.jinja2")


@bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")
