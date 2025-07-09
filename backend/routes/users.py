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


@users_bp.route('/promote', methods=['POST'])
def promote_user_to_host():
    data = request.json
    conn = get_sql_connection()
    cursor = conn.cursor()

    # Check if user exists
    cursor.execute("SELECT id FROM users WHERE id = %s", (data['id'],))
    result = cursor.fetchone()

    if result:
        # User exists, update
        cursor.execute("UPDATE users SET is_host = TRUE WHERE id = %s", (data['id'],))
    else:
        # New user, insert
        cursor.execute("""
            INSERT INTO users (id, name, email, is_host)
            VALUES (%s, %s, %s, TRUE)
        """, (data['id'], data['name'], data['email']))

    conn.commit()
    cursor.close()
    return jsonify({"message": "User promoted to host"})
