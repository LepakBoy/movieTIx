const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const helperWrapper = require("../helper/wrapper");

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization;

    //cek apakah ada token masih berlaku
    if (!token) {
      return helperWrapper.response(res, 403, `login first`);
    }
    token = token.split(" ")[1];

    //mencari apakah accessToken ada di redis? jika ada maka token diblok dan user harus login lagi
    redis.get(`accessToken:${token}`, (error, result) => {
      if (!error && result !== null) {
        return helperWrapper.response(res, 403, "your session has expired, please login again");
      }

      //mencocokan token
      jwt.verify(token, process.env.SECRETE_KEY, (error, result) => {
        if (error) {
          return helperWrapper.response(res, 403, error.message);
        }
        //menyimpan hasil token yg telah di dekripsi ke variable req.decodetoken dan bisa di panggil di semua controller yang di pasang middleware ini
        req.decodeToken = result;
        next();
      });
      console.log("auth proses");
    });
  },
  isAdmin: (req, res, next) => {
    if (req.decodeToken.role !== "admin") {
      return helperWrapper.response(res, 403, "you have no accees to this process");
    }
    next();
  },
};
