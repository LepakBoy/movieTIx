const connection = require("../../config/mysql");

module.exports = {
  getAllSchedule: (limit, offset, order, sort, location, movie_id) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM schedule WHERE location LIKE '%${location}%' AND id_movie LIKE '%${movie_id}%' ORDER BY ${order} ${sort} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getScheduleById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM schedule WHERE id_schedule =${id}`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getScheduleBetween: (dateStart, dateEnd) =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM schedule WHERE date_start = ? AND date_end = ?", [dateStart, dateEnd], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getCountSchedule: () =>
    new Promise((resolve, reject) => {
      connection.query("SELECT COUNT (*) AS total FROM schedule", (error, result) => {
        if (!error) {
          resolve(result[0].total);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  postSchedule: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO schedule SET ?", data, (error, result) => {
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
  updateSchedule: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE schedule SET ? WHERE id_schedule = ?", [data, id], (error, result) => {
        if (!error) {
          const newResult = {
            id,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  deleteSchedule: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM schedule WHERE id_schedule = ?", id, (error, result) => {
        if (!error) {
          resolve(id);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
