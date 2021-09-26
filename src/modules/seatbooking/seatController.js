const seatModel = require("./seatModel");
const helperWrapper = require("../../helper/wrapper");

module.exports = {
  getSeat: async (req, res) => {
    try {
      const { id_schedule, id_movie, date_booking, time_booking } = req.query;
      //   const setData = {
      //     id_schedule,
      //     id_movie,
      //     date_booking,
      //     time_booking,
      //   };
      const result = await seatModel.getSeat(id_schedule, id_movie, date_booking, time_booking);
      if (result.length < 1) {
        return helperWrapper.response(res, 400, `data not found`, null);
      }
      return helperWrapper.response(res, 200, `success get data`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
};
