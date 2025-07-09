from flask import Flask, Response
from routes.users import users_bp
from routes.listings import listings_bp
from routes.reservations import reservations_bp
from routes.locations import locations_bp
from routes.listing_images import images_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Register each blueprint manually
    app.register_blueprint(users_bp)
    app.register_blueprint(listings_bp)
    app.register_blueprint(reservations_bp)
    app.register_blueprint(locations_bp)
    app.register_blueprint(images_bp)
    # Optional: root route for testing
    @app.route('/')
    def home():
        return {'message': 'VillageStay backend is running ✅'}

    return app
