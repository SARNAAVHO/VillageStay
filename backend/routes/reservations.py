from flask import Blueprint, request, jsonify
from sql_connection import get_sql_connection

reservations_bp = Blueprint('reservations', __name__, url_prefix='/reservations')

@reservations_bp.route('/', methods=['POST'])
def make_reservation():
    data = request.json
    conn = get_sql_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reservations (guest_id, listing_id, date_check_in, date_check_out)
        VALUES (%s, %s, %s, %s)
    """, (
        data['guest_id'], data['listing_id'],
        data['date_check_in'], data['date_check_out']
    ))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Reservation created'}), 201

@reservations_bp.route('/guest/<int:guest_id>', methods=['GET'])
def get_reservations_for_guest(guest_id):
    conn = get_sql_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, listing_id, status, date_check_in, date_check_out
        FROM reservations
        WHERE guest_id = %s
        ORDER BY date_check_in DESC
    """, (guest_id,))
    rows = cursor.fetchall()
    reservations = [{
        'id': r[0],
        'listing_id': r[1],
        'status': r[2],
        'check_in': str(r[3]),
        'check_out': str(r[4])
    } for r in rows]
    cursor.close()
    return jsonify(reservations)
