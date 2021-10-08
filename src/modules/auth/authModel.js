const connection = require("../../config/mysql");

module.exports = {
  checkEmail: (email) =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user WHERE email = ?", email, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  register: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id_user: result.insertId,
            ...data,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  activate: (data) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE user SET status = ? WHERE id_user = ?", [data.status, data.id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
