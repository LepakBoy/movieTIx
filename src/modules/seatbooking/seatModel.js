const connection = require("../../config/mysql");

module.exports = {
  getSeat: (idSchedule, idMovie, date, time) =>
    new Promise((resolve, reject) => {
      connection.query("SELECT id_seat, seat FROM seatbooking WHERE id_schedule = ? AND id_movie = ? AND date_booking = ? AND time_booking = ?", [idSchedule, idMovie, date, time], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
