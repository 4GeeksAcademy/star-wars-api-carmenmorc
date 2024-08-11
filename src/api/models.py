from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    favorites = db.relationship('Favorite', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "favorites": [favorite.serialize() for favorite in self.favorites]  # Serializar la lista de favoritos
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


#FAVORITOS

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey('planet.id'), nullable=True)
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'), nullable=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=True)
    
    user = db.relationship('User', back_populates='favorites')
    planet = db.relationship('Planet')  
    character = db.relationship('Character')  
    vehicle = db.relationship('Vehicle')  

    def save(self):
        if not any([self.planet_id, self.character_id, self.vehicle_id]):
            raise ValueError("At least one of planet_id, character_id, or vehicle_id must be provided.")
        db.session.add(self)
        db.session.commit()
    
    def serialize(self):
        favorite_data = {
            "id": self.id,
            "user_id": self.user_id,
            "planet_id": self.planet_id,
            "character_id": self.character_id,
            "vehicle_id": self.vehicle_id
        }
        if self.planet:
            favorite_data["name"] = self.planet.name
            favorite_data["type"] = "planet"
        elif self.character:
            favorite_data["name"] = self.character.name
            favorite_data["type"] = "character"
        elif self.vehicle:
            favorite_data["name"] = self.vehicle.name
            favorite_data["type"] = "vehicle"
        return favorite_data
