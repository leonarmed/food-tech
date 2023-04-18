"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Products
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/create/user', methods = ['POST'])
def create_user():
    body = request.json
    new_user = User.create(body)
    if not isinstance(new_user, User):
        return jsonify({
            "message": new_user["message"],
            "success": False
        }), new_user["status"]
    user = User.query.filter_by(email=new_user.email).one_or_none()
    return jsonify({
        "success": True,
        "message": "User created successfully",
        "data": user.serialize()
    }), 201

@api.route('/login', methods = ["POST"])
def login():
    body = request.json
    valid_credentials = User.verify_credentials(email=body["email"], password=body["password"])
    if not isinstance(valid_credentials, User):
        return jsonify({
            "message": valid_credentials["message"],
            "success": False
        }), valid_credentials["status"]
    access_token = create_access_token(identity=valid_credentials.id)
    return jsonify({
        "message": "Successfully verification",
        "success": True,
        "data": {"token": access_token}
    }), 200

@api.route('/user', methods = ["GET", 'POST'])
@jwt_required()
def get_data_user():
    if request.method == "GET":
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({
                "message": "Error getting user info",
                "success": False
            }), 404
        return jsonify({
            "data": user.serialize()
        }), 200
    if request.method == "POST":
        user_id = get_jwt_identity()
        body = request.json
        user_updated = User.update_user(body, user_id)
        if not isinstance(user_updated, User):
            return jsonify({
                "message": user_updated["message"],
                "success": False
            }), user_updated["status"]
        return jsonify({
            "success": True,
            "message": "User updated successfully",
            "data": user_updated.serialize()
        }), 200

@api.route('/product', methods = ['POST'])
def create_product():
    body = request.json
    new_product = Products.create(body)
    if not isinstance(new_product, Products):
        return jsonify({
            "message": new_product["message"],
            "success": False
        }), new_product["status"]
    products = Products.query.filter_by(barcode=new_product.barcode).one_or_none()
    return jsonify({
        "success": True,
        "message": "Products created successfully",
        "data": products.serialize()
    }), 201

@api.route('success', methods = ['POST'])
def show_success_test():
    return jsonify({"status": 'success'})