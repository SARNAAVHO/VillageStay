from flask import Blueprint, request, jsonify
from sql_connection import get_sql_connection

locations_bp = Blueprint('locations', __name__, url_prefix='/locations')

@locations_bp.route('/', methods=['POST'])
def add_location():
    data = request.json
    conn = get_sql_connection()
    cursor = conn.cursor()

    # Confirm user is host
    cursor.execute("SELECT is_host FROM users WHERE id = %s", (data['user_id'],))
    result = cursor.fetchone()
    if not result or not result[0]:
        return jsonify({'error': 'Only hosts can add locations'}), 403

    # Insert location
    cursor.execute("""
        INSERT INTO locations (village, district, state, country, latitude, longitude)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        data['village'], data.get('district'), data['state'],
        data.get('country', 'India'), data.get('latitude'), data.get('longitude')
    ))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Location added'}), 201


@locations_bp.route('/', methods=['GET'])
def list_locations():
    conn = get_sql_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, village, district, state, country FROM locations")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify([
        {
            'id': r[0],
            'village': r[1],
            'district': r[2],
            'state': r[3],
            'country': r[4]
        } for r in rows
    ])

@locations_bp.route('/find', methods=['GET'])
def find_location():
    village = request.args.get('village')
    district = request.args.get('district')
    state = request.args.get('state')

    conn = get_sql_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id FROM locations
        WHERE village = %s AND district = %s AND state = %s
    """, (village, district, state))
    result = cursor.fetchone()
    cursor.close()

    if result:
        return jsonify({'location_id': result[0]})
    else:
        return jsonify({'error': 'Location not found'}), 404
