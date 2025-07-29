from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from config import Config
from flask_login import LoginManager


app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login = LoginManager()
login.login_view = "/login" 
login.init_app(app)

from app.api import routes  
from app import models  

from app.api.routes import bp as main_bp
app.register_blueprint(main_bp)

from app.api import bp
app.register_blueprint(bp, url_prefix="/api")
