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
    try:
        data = request.json
        clerk_user_id = data.get('id')         # Clerk's user ID
        name = data.get('name')
        email = data.get('email')

        if not clerk_user_id or not email:
            return jsonify({"error": "Missing required fields"}), 400

        conn = get_sql_connection()
        cursor = conn.cursor()

        # ✅ Match by user_id, not id
        cursor.execute("SELECT id FROM users WHERE user_id = %s", (clerk_user_id,))
        result = cursor.fetchone()

        if result:
            cursor.execute("UPDATE users SET is_host = TRUE WHERE user_id = %s", (clerk_user_id,))
        else:
            cursor.execute("""
                INSERT INTO users (user_id, full_name, email, is_host)
                VALUES (%s, %s, %s, TRUE)
            """, (clerk_user_id, name, email))

        conn.commit()
        cursor.close()
        return jsonify({"message": "User promoted to host"})

    except Exception as e:
        print("❌ Error in /users/promote:", e)
        return jsonify({"error": str(e)}), 500


