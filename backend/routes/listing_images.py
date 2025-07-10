from flask import Blueprint, request, jsonify
from sql_connection import get_sql_connection
import os
import dropbox
from werkzeug.utils import secure_filename

images_bp = Blueprint('images', __name__, url_prefix='/images')
DROPBOX_ACCESS_TOKEN = os.getenv('DROPBOX_ACCESS_TOKEN')

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
    # Get form data and file
    listing_id = request.form['listing_id']
    user_id = request.form['user_id']
    alt_text = request.form.get('alt_text', '')
    position = request.form.get('position', 1)
    file = request.files['image']
    
    filename = secure_filename(file.filename)
    
    conn = get_sql_connection()
    cursor = conn.cursor()

    # Host verification
    cursor.execute("""
        SELECT u.is_host
        FROM listings l
        JOIN users u ON l.host_id = u.id
        WHERE l.id = %s AND u.id = %s
    """, (listing_id, user_id))
    result = cursor.fetchone()
    
    if not result or not result[0]:
        return jsonify({'error': 'Only hosts can upload images'}), 403

    # Upload to Dropbox
    dbx = dropbox.Dropbox(DROPBOX_ACCESS_TOKEN)
    dropbox_path = f"/listings/{listing_id}_{filename}"
    dbx.files_upload(file.read(), dropbox_path, mode=dropbox.files.WriteMode.overwrite)
    shared_link = dbx.sharing_create_shared_link_with_settings(dropbox_path)
    url = shared_link.url.replace("?dl=0", "?raw=1")

    # Save to database
    cursor.execute("""
        INSERT INTO listing_images (
            listing_id, 
            url, 
            alt_text, 
            position
        ) VALUES (%s, %s, %s, %s)
    """, (listing_id, url, alt_text, position))
    
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Image uploaded successfully'}), 201