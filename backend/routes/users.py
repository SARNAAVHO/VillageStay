from flask import Blueprint, request, jsonify
from sql_connection import get_sql_connection

users_bp = Blueprint('users', __name__, url_prefix='/users')

@users_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = get_sql_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO users (full_name, email, password_hash, is_host)
        VALUES (%s, %s, %s, %s)
    """, (data['full_name'], data['email'], data['password_hash'], data.get('is_host', False)))

    conn.commit()
    cursor.close()
    return jsonify({'message': 'User registered'}), 201
