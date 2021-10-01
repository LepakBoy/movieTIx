const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");
const redis = require("../../config/redis");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, first_name, last_name } = req.body;
      //proses cek email : email sudh terdaftar atau belum
      //enkrip pasword
      const hash = await bcrypt.hash(password, 12);
      const setData = {
        id_user: uuidv4(),
        email,
        password: hash,
        first_name,
        last_name,
      };

      const checkMail = await authModel.checkEmail(email);
      if (checkMail.length > 0) {
        return helperWrapper.response(res, 400, `email was registred on another account`, null);
      }

      const result = await authModel.register(setData);
      return helperWrapper.response(res, 200, `succes set data`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request ${error.message}`, null);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await authModel.checkEmail(email);

      if (checkEmail.length < 1) {
        return helperWrapper.response(res, 400, `email not registred`, null);
      }

      const validPass = await bcrypt.compare(password, checkEmail[0].password);
      if (!validPass) {
        return helperWrapper.response(res, 400, `wrong password`);
      }

      // if (password !== checkEmail[0].password) {
      //   return helperWrapper.response(res, 400, `wrong password`);
      // }

      //proses utama: membuat token dengan JWT(data yang mau diubah, kata kunci, lama token yang bisa dugunakan)
      const payload = checkEmail[0];
      delete payload.password;

      //generate dan enkripsi token dengan jwt.sign
      const token = jwt.sign({ ...payload }, "rahasia", { expiresIn: "24h" });
      return helperWrapper.response(res, 200, `success login`, { id_user: payload.id_user, token });
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request ${error.message}`, null);
    }
  },
  logout: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      redis.setex(`accessToken:${token}`, 3600 * 24, token);
      return helperWrapper.response(res, 200, `success logout`, null);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request ${error.message}`, null);
    }
  },
};
