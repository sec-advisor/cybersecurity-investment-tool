from flask import jsonify, request
from sqlalchemy_imageattach.context import pop_store_context, push_store_context
from werkzeug.exceptions import BadRequest, NotFound
import os
from engine import app, db
from engine import store
from engine.database.models import Service, CustomerProfile, Review
from engine.helpers.service_helper import ServiceHelper
from engine.recommender_engine import RecEngine
from engine.schemas.recommend_service_schema import recommend_service_schema


@app.before_request
def start_implicit_store_context():
    push_store_context(store)


@app.teardown_request
def stop_implicit_store_context(exception=None):
    pop_store_context()


@app.route("/v1/services")
def get_services():
    return jsonify([i.serialize() for i in Service.query.all()])


@app.route("/v1/services/<id>")
def get_service(id):
    currentService = Service.query.get(id)

    if Service is None:
        raise BadRequest("Service with the specified ID does not exist")
    return jsonify(currentService.serialize())


@app.route("/v1/services", methods=["POST"])
def upload_service():
    # Avoid duplicate
    if (
        Service.query.filter_by(serviceHash=request.form["serviceHash"]).scalar()
        is None
    ):
        # Store logo locally
        if request.files["file"]:
            file = request.files["file"]
            file.save(os.path.join("static/images", file.filename))

            # Map Json request to model
            new_service = Service().form_to_obj(request.form, file)

            with app.app_context():
                with open(f"static/images/{new_service.imageName}", "rb") as f:
                    new_service.image.from_file(f)
                db.session.add(new_service)
                db.session.commit()
                db.session.refresh(new_service)
                db.session.close()

            return jsonify("Service stored successfully")

    else:
        return jsonify("Service is already stored into the DB")


@app.route("/v1/recommend", methods=["POST"])
def recommend_service():
    # Validate Data
    if not recommend_service_schema.is_valid(request.get_json()):
        raise BadRequest("Data is not valid")

    # Map Json request to model
    custProfile = CustomerProfile().json_to_obj(request.get_json())

    # Set the services helper
    # helper = mock_services()
    helper = ServiceHelper(Service.query.all(), custProfile.budget)
    helper.apply_filters_to_services(custProfile)

    re = RecEngine(helper, custProfile)

    return jsonify(re.recommend_services())


@app.route("/v1/upload", methods=["POST"])
def upload_review():
    if request.files["file"]:

        current_service = Service.query.get(request.form["serviceId"])

        if current_service is not None:

            customer_review = Review(
                service_id=current_service.id,
                rating=request.form["rating"],
                comment=request.form["comment"],
                fileName=request.files["file"].filename,
                fileData=request.files["file"].read(),
            )
            with app.app_context():
                db.session.add(customer_review)
                db.session.commit()
                db.session.refresh(customer_review)
                db.session.close()

            return jsonify(customer_review.serialize)
        else:
            raise NotFound("Service with given id does not exist")

    else:
        raise BadRequest("The review does not include a Log File")
