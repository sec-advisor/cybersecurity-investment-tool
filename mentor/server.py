from engine import app, db
from engine.database.models import load_data
import os

if __name__ == "__main__":
  db.drop_all()
  db.create_all()
  db.session.commit()
  load_data(app, db)
  app.run(host='0.0.0.0', port=os.getenv("PORT"))