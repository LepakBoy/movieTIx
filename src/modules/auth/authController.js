const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");
const redis = require("../../config/redis");
const bcrypt = require("bcrypt");
const sendMail = require("../../helper/email");

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

      const setDataEmail = {
        to: email,
        subject: "Email Verification",
        template: "email-verification",
        //data : yang mau dikirim ke template
        data: {
          firstname: setData.first_name,
          email: email,
          //localhost url
          // link: `http://localhost:3000/auth/activate-account/${setData.id_user}`,
          link: `http://movie-tix.herokuapp.com/auth/activate-account/${setData.id_user}`,
        },

        //jika ingin melampirkan attachment
        attachment: [
          // {
          //   filename: "movie1.jpg",
          //   path: "./public/uploads/movie/2021-09-30T07-27-22.329Zwa.jpeg",
          // },
        ],
      };

      await sendMail.verificationAccount(setDataEmail);

      const result = await authModel.register(setData);
      return helperWrapper.response(res, 200, `succes set data`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request ${error.message}`, null);
    }
  },
  accountActivate: async (req, res) => {
    try {
      const { id } = req.params;
      const status = "active";
      const setData = {
        id,
        status,
      };
      console.log(setData);
      const result = await authModel.activate(setData);
      return helperWrapper.response(res, 200, `succes activate account`, result);
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

      //cek apaakah acount sudah diaktifasi
      if (checkEmail[0].status !== "active") {
        return helperWrapper.response(res, 400, `check your email for account acticvation`, null);
      }

      const validPass = await bcrypt.compare(password, checkEmail[0].password);
      if (!validPass) {
        return helperWrapper.response(res, 400, `wrong password`);
      }

      //proses utama: membuat token dengan JWT(data yang mau diubah, kata kunci, lama token yang bisa dugunakan)
      const payload = checkEmail[0];
      delete payload.password;

      //generate dan enkripsi token dengan jwt.sign
      const token = jwt.sign({ ...payload }, process.env.SECRETE_KEY, { expiresIn: "2h" });

      //refresh token
      const refreshToken = jwt.sign({ ...payload }, process.env.SECRETE_KEY, { expiresIn: "24h" });

      return helperWrapper.response(res, 200, `success login`, { id_user: payload.id_user, token, refreshToken });
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
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      //cek apakah refresh token masih berlaku?
      redis.get(`refreshToken:${refreshToken}`, (error, result) => {
        //kalau refresh token sudah ada di redis(masuk daftar blacklist)
        if (!error && result !== null) {
          return helperWrapper.response(res, 400, `your refresh token cannot be used again`);
        }

        //cek apakah refresh token masih aktif?
        jwt.verify(refreshToken, process.env.SECRETE_KEY, (error, result) => {
          //jika refresh token sudah expired
          if (error) {
            return helperWrapper.response(res, 403, error, message);
          }

          delete result.iat;
          delete result.exp;
          const token = jwt.sign(result, process.env.SECRETE_KEY, { expiresIn: "2h" });
          const newRefreshToken = jwt.sign(result, process.env.SECRETE_KEY, { expiresIn: "24h" });

          //masukan refresh token yang lama ke redis untuk di nonaktifkan/blacklist
          redis.setex(`refreshToken:${refreshToken}`, 3600 * 24, refreshToken);
          return helperWrapper.response(res, 200, `success refresh token`, { id: result.id, token, refreshToken: newRefreshToken });
        });
      });
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request ${error.message}`, null);
    }
  },
};
