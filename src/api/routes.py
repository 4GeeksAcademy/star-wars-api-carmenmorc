"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#USUARIO


@api.route('/all_users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    print(users)
    users = [user.serialize() for user in users]
    print(users)
    return jsonify({'msg':'OK',
                    'data' : users})


#delete 48:44
@api.route('/delete_user/><int:id>', methods=['DELETE'])
def delete_user(id):

    user = User.query.get(id)
    print(user)
    db.session.delete(user)
    db.session.commit()

    return jsonify({'msg':'Se eliminó el usuario ' + user.email }), 200


#add 54:04
@api.route('/add_user', methods=['POST'])
def add_user():

    data = request.json
    print(data)
    new_user = User(email = data['email'], password = data['password'], is_active = True )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'msg':'Se creó el usuario'}), 200


#put 1:04:19
@api.route('/deactivate/<int:id>', methods=['PUT'])
def deactivate_user(id):

    user = User.query.get(id)
    user.is_active = False
    db.session.commit()

    return jsonify({'msg':'El usuario ha sido desactivado', 'data':user.serialize()}), 200

@api.route('/activate/<int:id>', methods=['PUT'])
def activate_user(id):

    user = User.query.get(id)
    user.is_active = True
    db.session.commit()

    return jsonify({'msg':'El usuario ha sido activado', 'data':user.serialize()}), 200

@api.route('/edit_user/<int:id>', methods=['PUT'])
def edit_user(id):
    
    data = request.json
    user = User.query.get(id)
    user.email = data['email']
    user.is_active = data['is_active']
    db.session.commit()

    return jsonify({'msg':'El usuario ha sido editado', 'data':user.serialize()}), 200

