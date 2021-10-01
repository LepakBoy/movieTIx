const { query } = require("../../config/mysql");
const connection = require("../../config/mysql");

module.exports = {
  getAllUser: () =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user", (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getUserbyId: (id) =>
    new Promise((resolve, result) => {
      connection.query("SELECT * FROM user WHERE id_user = ?", id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  editUser: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE user SET ? WHERE id_user = ?", [data, id], (error, result) => {
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
  changePassword: (password, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE user SET password = ? WHERE id_user = ?", [password, id], (error, result) => {
        if (!error) {
          const newPass = {
            id,
            password,
          };
          resolve(newPass);
        } else {
          reject(new Error(`SQL : (${error.sqlMessage})`));
        }
      });
    }),
  editUserImage: (image, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE user SET user_image = ? WHERE id_user = ?", [image, id], (error, result) => {
        if (!error) {
          const newResult = {
            id,
            image,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : (${error.sqlMessage})`));
        }
      });
    }),
};
