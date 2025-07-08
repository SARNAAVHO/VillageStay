from flask import Blueprint, request, jsonify
from sql_connection import get_sql_connection

images_bp = Blueprint('images', __name__, url_prefix='/images')

@images_bp.route('/<int:listing_id>', methods=['GET'])
def get_images_for_listing(listing_id):
    conn = get_sql_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT url, alt_text, position
        FROM listing_images
        WHERE listing_id = %s
        ORDER BY position
    """, (listing_id,))
    rows = cursor.fetchall()
    images = [{'url': r[0], 'alt_text': r[1], 'position': r[2]} for r in rows]
    cursor.close()
    return jsonify(images)

@images_bp.route('/', methods=['POST'])
def upload_image():
    data = request.json
    conn = get_sql_connection()
    cursor = conn.cursor()

    # Confirm user is host for the listing
    cursor.execute("""
        SELECT u.is_host
        FROM listings l
        JOIN users u ON l.host_id = u.id
        WHERE l.id = %s AND u.id = %s
    """, (data['listing_id'], data['user_id']))
    result = cursor.fetchone()
    if not result or not result[0]:
        return jsonify({'error': 'Only hosts can upload images to their listings'}), 403

    # Upload image
    cursor.execute("""
        INSERT INTO listing_images (listing_id, url, alt_text, position)
        VALUES (%s, %s, %s, %s)
    """, (
        data['listing_id'], data['url'], data.get('alt_text', ''), data.get('position', 1)
    ))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Image uploaded'}), 201

