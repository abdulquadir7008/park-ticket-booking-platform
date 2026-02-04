const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Booking {
  /**
   * Create a new booking
   */
  static create(bookingData) {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const qrCode = id; // QR code contains the booking ID
      
      const { date, timeSlot, tickets, name, email, totalPrice } = bookingData;
      
      const sql = `
        INSERT INTO bookings (id, date, timeSlot, tickets, name, email, totalPrice, qrCode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(
        sql,
        [id, date, timeSlot, tickets, name, email, totalPrice, qrCode],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id,
              date,
              timeSlot,
              tickets,
              name,
              email,
              totalPrice,
              qrCode,
              status: 'active'
            });
          }
        }
      );
    });
  }

  /**
   * Find booking by ID
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM bookings WHERE id = ?';
      
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Find booking by QR code
   */
  static findByQrCode(qrCode) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM bookings WHERE qrCode = ?';
      
      db.get(sql, [qrCode], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Update booking status
   */
  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
      
      db.run(sql, [status, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, status });
        }
      });
    });
  }

  /**
   * Get all bookings
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM bookings ORDER BY createdAt DESC';
      
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Booking;