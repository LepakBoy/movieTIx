const connection = require("../../config/mysql");

module.exports = {
  getAllSchedule: (limit, offset, order, sort, location, movie_id) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM schedule WHERE location LIKE '%${location}%' AND movie_id LIKE '%${movie_id}%' ORDER BY ${order} ${sort} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getScheduleById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM schedule WHERE id =${id}`, (error, result) => {
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
            id: result.insertId,
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
      connection.query("UPDATE schedule SET ? WHERE id = ?", [data, id], (error, result) => {
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
      connection.query("DELETE FROM schedule WHERE id = ?", id, (error, result) => {
        if (!error) {
          resolve(id);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
