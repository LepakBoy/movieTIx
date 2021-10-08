// const e = require("express");
const connection = require("../../config/mysql");

module.exports = {
  getAllMovie: (limit, offset, name, order, sort) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM movie WHERE movie_name LIKE '%${name}%' ORDER BY ${order} ${sort} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getMovieById: (id) =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM movie WHERE id_movie = ?", id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getMovieByName: (name) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM movie WHERE movie_name LIKE '%${name}%'`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getCountMovie: (name) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT COUNT (*) AS total FROM movie WHERE movie_name LIKE '%${name}%'`, (error, result) => {
        if (!error) {
          resolve(result[0].total);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  postMovie: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query("INSERT INTO movie SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id_movie: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  updateMovie: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE movie SET ? WHERE id_movie = ?", [data, id], (error, result) => {
        if (!error) {
          const newResult = {
            id,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : (${error.sqlMessage})`));
        }
      });
    }),
  deleteMovie: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM movie WHERE id_movie = ?", id, (error, result) => {
        if (!error) {
          resolve(id);
        } else {
        }
      });
    }),
};
