from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy_imageattach.stores.fs import HttpExposedFileSystemStore

app = Flask(__name__)
store = HttpExposedFileSystemStore(path="tmp/images", prefix="static/images/")
app.wsgi_app = store.wsgi_middleware(app.wsgi_app)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database/app.db"
db = SQLAlchemy(app)

from engine import routes  # noqa: F401,E402
