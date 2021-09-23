const scheduleModel = require("./scheduleModel");
const helperWrapper = require("../../helper/wrapper/index");

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
        movie_id = 1;
      }
      if (!location) {
        location = "jakarta";
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
      return helperWrapper.response(res, 200, `success get all data`, result, pageInfo);
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
      return helperWrapper.response(res, 200, `success get data by id`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  postSchedule: async (req, res) => {
    try {
      const { movie_id, teater_name, price, location, date_start, date_end, time_schedule } = req.body;
      const setData = {
        movie_id,
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
