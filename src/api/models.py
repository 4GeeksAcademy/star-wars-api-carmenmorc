from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#USUARIO

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
#PERSONAJES

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    height = db.Column(db.String(120), unique=True, nullable=True)
    mass = db.Column(db.String(120), unique=True, nullable=True)
    hair_color = db.Column(db.String(120), unique=True, nullable=True)
    skin_color = db.Column(db.String(120), unique=True, nullable=True)
    eye_color = db.Column(db.String(120), unique=True, nullable=True)

    def __repr__(self):
        return f'<Character {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name, 
            "characteristics" : [self.height, self.mass, self.hair_color, self.skin_color, self.eye_color]
        }
    
#VEHICULOS

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    model = db.Column(db.String(120), unique=True, nullable=True)
    manufacturer = db.Column(db.String(120), unique=True, nullable=True)
    crew = db.Column(db.String(120), unique=True, nullable=True)
    passengers = db.Column(db.String(120), unique=True, nullable=True)
    vehicle_class = db.Column(db.String(120), unique=True, nullable=True)

    def __repr__(self):
        return f'<Vehicle {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name, 
            "characteristics" : [self.model, self.manufacturer, self.crew, self.passengers, self.vehicle_class]
        }
    

#PLANETAS

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    diameter = db.Column(db.String(120), unique=True, nullable=True)
    climate = db.Column(db.String(120), unique=True, nullable=True)
    gravity = db.Column(db.String(120), unique=True, nullable=True)
    terrain = db.Column(db.String(120), unique=True, nullable=True)
    surface_water = db.Column(db.String(120), unique=True, nullable=True)

    def __repr__(self):
        return f'<Planet {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name, 
            "characteristics" : [self.diameter, self.climate, self.gravity, self.terrain, self.surface_water]
        }