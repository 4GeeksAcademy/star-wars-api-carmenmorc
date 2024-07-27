"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Vehicle, Planet, Favorite
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
    
    return jsonify({'msg':'Se creó el usuario', 'data' : data}), 200


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


#PERSONAJES

@api.route('/all_characters', methods=['GET'])
def get_all_characters():
    characters = Character.query.all()
    print(characters)
    characters = [char.serialize() for char in characters]
    print(characters)
    return jsonify({'msg':'OK',
                    'data' : characters})

@api.route('/character/<int:id>', methods=['GET'])
def get_single_character(id):
    character = Character.query.get(id)
    if character:
        return jsonify({'msg': 'OK', 'data': character.serialize()})
    else:
        return jsonify({'msg': 'Character not found'}), 404
    

#VEHICULOS

@api.route('/all_vehicles', methods=['GET'])
def get_all_vehicles():
    vehicles = Vehicle.query.all()
    print(vehicles)
    vehicles = [vehi.serialize() for vehi in vehicles]
    print(vehicles)
    return jsonify({'msg':'OK',
                    'data' : vehicles})

@api.route('/vehicles/<int:id>', methods=['GET'])
def get_single_vehicle(id):
    vehicles = Vehicle.query.get(id)
    if vehicles:
        return jsonify({'msg': 'OK', 'data': vehicles.serialize()})
    else:
        return jsonify({'msg': 'Vehicle not found'}), 404
    

#PLANETAS

@api.route('/all_planets', methods=['GET'])
def get_all_planets():
    planets = Planet.query.all()
    print(planets)
    planets = [pla.serialize() for pla in planets]
    print(planets)
    return jsonify({'msg':'OK',
                    'data' : planets})

@api.route('/planets/<int:id>', methods=['GET'])
def get_single_planet(id):
    planets = Planet.query.get(id)
    if planets:
        return jsonify({'msg': 'OK', 'data': planets.serialize()})
    else:
        return jsonify({'msg': 'Planet not found'}), 404
    

#FAVORITOS

