const redis = require("../config/redis");
const helperWrapper = require("../helper/wrapper");

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params;
    redis.get(`getMovie:${id}`, (error, result) => {
      if (!error && result !== null) {
        //jika data sudah ada di redis, ambil data dari redis
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(res, 200, `success get data by id`, newResult);
      } else {
        //jika tidak data sudah ada di redis, ambil data dari redis, lanjutkan ke proses selanjutnya(lihat movieRoutes untuk proses selanjutnya)
        console.log("data tidak ada di redis");
        next();
      }
    });
  },
  getMovieRedis: (req, res, next) => {
    redis.get(`getMovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(res, 200, "succeess get data", newResult.result, newResult.pageInfo);
      } else {
        console.log("data tidak ada di redis");
        next();
      }
    });
  },
  clearMovieRedis: (req, res, next) => {
    redis.keys("getMovie:*", (error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
      next();
    });
  },
  getScheduleRedis: (req, res, next) => {
    redis.get(`getSchedule:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        console.log(`data schedule ada di dalam redis`);
        const newResult = JSON.parse(result);
        return helperWrapper.response(res, 200, `success get data`, newResult.result, newResult.pageInfo);
      } else {
        console.log("data tidak ada di redis");
        next();
      }
    });
  },
  getScheduleByIdRedis: (req, res, next) => {
    const { id } = req.params;
    redis.get(`getSchedule:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log(`data ada di dalam redis`);
        const newResult = JSON.parse(result);
        return helperWrapper.response(res, 200, `succeess get data`, newResult);
      } else {
        console.log("data tidak ada di redis");
        next();
      }
    });
  },
  clearScheduleRedis: (req, res, next) => {
    redis.keys(`getSchedule:*`, (error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
      next();
    });
  },
};
