const connection = require("../../config/mysql");

module.exports = {
  getBookingById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT booking.id_booking,seatbooking.id_seat, id_user, booking.date_booking, booking.id_schedule, total_ticket, payment_method, status_payment, seatbooking.seat FROM booking JOIN seatbooking ON booking.id_booking=seatbooking.id_booking WHERE booking.id_booking = ${id}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  postBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO booking SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id_schedule: result.insertId,
            ...data,
          };

          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
