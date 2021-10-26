const scheduleModel = require("./scheduleModel");
const helperWrapper = require("../../helper/wrapper/index");
const redis = require("../../config/redis");

module.exports = {
  getAllSchedule: async (req, res) => {
    try {
      let { page, limit, order, sort, location, movie_id } = req.query;
      page = Number(page);
      limit = Number(limit);
      movie_id = Number(movie_id);

      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 10;
      }
      if (!order) {
        order = "price";
      }
      if (!sort) {
        sort = "ASC";
      }
      if (!movie_id) {
        movie_id = "";
      }
      if (!location) {
        location = "";
      }

      const offset = page * limit - limit;
      const totalData = await scheduleModel.getCountSchedule();
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await scheduleModel.getAllSchedule(limit, offset, order, sort, location, movie_id);

      //MENGUBAH BENTUK TIMESCHEDULE MENJADI ARRAY
      const newResult = result.map((item) => {
        const data = {
          ...item,
          time_schedule: item.time_schedule.split(","),
        };
        return data;
      });

      //set kedalam redis
      //redis dimatikan karna jika get data schedule dari redis bentuk time_schedule berubah menjadi string||yang diinginkan : array
      // redis.setex(`getSchedule:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ newResult, pageInfo }));

      return helperWrapper.response(res, 200, `success get all data`, newResult, pageInfo);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  getScheduleById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await scheduleModel.getScheduleById(id);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }

      const newResult = result.map((item) => {
        const data = {
          ...item,
          time_schedule: item.time_schedule.split(","),
        };
        return data;
      });

      redis.setex(`getSchedule:${id}`, 3600, JSON.stringify(result));
      return helperWrapper.response(res, 200, `success get data by id`, newResult);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  getScheduleBetween: async (req, res) => {
    try {
      const { dateStart, dateEnd } = req.query;
      const result = await scheduleModel.getScheduleBetween(dateStart, dateEnd);
      return helperWrapper.response(res, 200, `success get all data`, result);
      // console.log(result);
    } catch {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  postSchedule: async (req, res) => {
    try {
      const { id_movie, teater_name, price, location, date_start, date_end, time_schedule } = req.body;
      const setData = {
        id_movie,
        teater_name,
        price,
        location,
        date_start,
        date_end,
        time_schedule,
      };

      const result = await scheduleModel.postSchedule(setData);
      return helperWrapper.response(res, 200, "success create data", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await scheduleModel.getScheduleById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }
      const { movie_id, teater_name, price, location, date_start, date_end, time_schedule } = req.body;
      const setData = {
        movie_id,
        teater_name,
        price,
        location,
        date_start,
        date_end,
        time_schedule,
        updatedAt: new Date(Date.now()),
      };
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }
      const result = await scheduleModel.updateSchedule(setData, id);
      return helperWrapper.response(res, 200, "success update data", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await scheduleModel.getScheduleById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }
      const result = await scheduleModel.deleteSchedule(id);
      return helperWrapper.response(res, 200, "success delete data", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
};
