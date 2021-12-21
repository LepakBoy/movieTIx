const connection = require("../../config/mysql");

module.exports = {
  getBookingById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT booking.id_booking, id_user, booking.createdAt, booking.date_booking, booking.time_booking, booking.id_schedule, booking.id_movie, total_ticket, booking.payment_total, payment_method, payment_status, booking_status, seatbooking.seat, movie.movie_name, schedule.teater_name FROM booking JOIN seatbooking ON booking.id_booking=seatbooking.id_booking JOIN movie ON booking.id_movie=movie.id_movie JOIN schedule ON booking.id_schedule=schedule.id_schedule WHERE booking.id_booking = ${id}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getBookingByIdUser: (id) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        `SELECT booking.id_booking, id_user, booking.date_booking, booking.time_booking, booking.booking_status, booking.id_schedule, booking.id_movie, total_ticket, booking.payment_total, payment_method, payment_status, seatbooking.seat, movie.movie_name, schedule.teater_name FROM booking JOIN seatbooking ON booking.id_booking=seatbooking.id_booking JOIN movie ON booking.id_movie=movie.id_movie JOIN schedule ON booking.id_schedule=schedule.id_schedule WHERE booking.id_user = '${id}'`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      console.log(query.sql);
    }),
  postBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO booking SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id_booking: result.insertId,
            ...data,
          };

          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  postSeatBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO seatbooking SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id_seat: result.insertId,
              ...data,
            };

            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateStatus: (status, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET booking_status = ? WHERE id_booking = ?",
        [status, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id,
              status,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  dashboard: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        " SELECT MONTHNAME(b.createdAt) AS month, SUM(b.payment_total) AS total FROM booking AS b JOIN schedule AS s ON b.id_schedule = s.id_schedule WHERE YEAR(s.createdAt) = YEAR(NOW()) AND b.id_movie = ? AND s.location = ? AND s.teater_name = ? GROUP BY MONTHNAME(b.createdAt)",
        [data.id_movie, data.location, data.teater_name],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  midtransNotif: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET payment_method = ?, payment_status = ?, booking_status = ? WHERE id_booking = ?",
        [
          data.payment_method,
          data.transactionStatus,
          data.booking_status,
          data.id_booking,
        ],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  paymentUrl: (url, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET payment_url = ? WHERE id_booking = ?",
        [url, id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),

  bookingDataEmail: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT id_booking, date_booking, time_booking, id_movie, id_schedule, payment_total, payment_method, payment_status, user.email, first_name, total_ticket FROM booking JOIN user ON booking.id_user=user.id_user WHERE booking.id_booking = ${id} `,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
