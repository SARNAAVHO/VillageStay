from flask import Blueprint, request, jsonify
from sql_connection import get_sql_connection

listings_bp = Blueprint('listings', __name__, url_prefix='/listings')

@listings_bp.route('/', methods=['GET'])
def get_all_listings():
    conn = get_sql_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, host_id, location_id, title, description, max_guests, base_price, created_at
        FROM listings
    """)
    rows = cursor.fetchall()
    listings = [{
        'id': r[0],
        'host_id': r[1],
        'location_id': r[2],
        'title': r[3],
        'description': r[4],
        'max_guests': r[5],
        'base_price': float(r[6]) if r[6] else None,
        'created_at': r[7].isoformat()
    } for r in rows]
    cursor.close()
    return jsonify(listings)

@listings_bp.route('/', methods=['POST'])
def create_listing():
    data = request.json
    conn = get_sql_connection()
    cursor = conn.cursor()

    # Step 1: Verify host status using internal numeric ID
    cursor.execute("SELECT is_host FROM users WHERE id = %s", (data['host_id'],))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({'error': 'User not found'}), 404
    
    is_host = result[0]
    if not is_host:
        return jsonify({'error': 'Only hosts can create listings'}), 403

    # Step 2: Create listing
    cursor.execute("""
        INSERT INTO listings (
            host_id, 
            location_id, 
            title, 
            description, 
            max_guests, 
            base_price
        ) VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        data['host_id'],
        data['location_id'],
        data['title'],
        data['description'],
        data.get('max_guests', 4),
        data.get('base_price')
    ))
    
    listing_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Listing created', 'listing_id': listing_id}), 201