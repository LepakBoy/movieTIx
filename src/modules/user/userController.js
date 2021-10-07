const userModel = require("./userModel");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("../auth/authModel.js");
const deleteFile = require("../../helper/uploads/deleteFiles");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const result = await userModel.getAllUser();
      return helperWrapper.response(res, 200, `success get all data`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.getUserbyId(id);

      return helperWrapper.response(res, 200, `success get all data`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  editUser: async (req, res) => {
    try {
      const id = req.decodeToken.id_user;
      const { email, first_name, last_name } = req.body;

      //cek apakah email sudah terpakai
      const checkEmail = await authModel.checkEmail(email);

      if (checkEmail.length > 0) {
        return helperWrapper.response(res, 400, `email has registred in another account`, null);
      }

      const setData = {
        email,
        first_name,
        last_name,
        updatedAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      const result = await userModel.editUser(setData, id);
      return helperWrapper.response(res, 200, `data has been updated`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  changePassword: async (req, res) => {
    try {
      const id = req.decodeToken.id_user;
      const { password, conPassword } = req.body;

      if (password !== conPassword) {
        return helperWrapper.response(res, 400, `password does'nt match`, null);
      }

      const hash = await bcrypt.hash(password, 12);

      const result = await userModel.changePassword(hash, id);

      return helperWrapper.response(res, 200, `password has been changed`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  editUserImage: async (req, res) => {
    try {
      const id = req.decodeToken.id_user;
      const chek = await userModel.getUserbyId(id);

      if (chek.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }

      const user_image = req.file ? req.file.filename : null;
      const setData = {
        user_image,
        updatedAt: new Date(Date.now()),
      };

      if (!user_image) {
        return helperWrapper.response(res, 400, `no image selected...image didn't changed`, null);
      }

      if (chek[0].user_image && req.file) {
        deleteFile(`public/uploads/user/${chek[0].user_image}`);
      }

      const result = await userModel.editUserImage(setData, id);
      return helperWrapper.response(res, 200, `image has been changed`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
};
