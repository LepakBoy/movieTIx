const bookingModel = require("./bookingModel");
const helperWrapper = require("../../helper/wrapper");

module.exports = {
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await bookingModel.getBookingById(id);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }
      return helperWrapper.response(res, 200, `succes get data by id`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  postBooking: async (req, res) => {
    try {
      const { id_user, date_booking, time_booking, id_movie, id_schedule, total_ticket, total_payment, payment_method, status_payment, seat } = req.body;
      const setDataBooking = {
        id_user,
        date_booking,
        time_booking,
        id_movie,
        id_schedule,
        total_ticket,
        total_payment,
        payment_method,
        status_payment,
      };
      // const setDataSeat = {
      //   id_booking,
      //   id_schedule,
      //   id_movie,
      //   date_booking,
      //   time_booking,
      //   seat,
      // };
      const result = await bookingModel.postBooking(setDataBooking);
      return helperWrapper.response(res, 200, "success create data", result);
      // console.log(req.body);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
};
