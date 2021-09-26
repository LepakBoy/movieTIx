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
  getBookingByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await bookingModel.getBookingByIdUser(id);
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
      const { id_user, date_booking, time_booking, id_movie, id_schedule, total_ticket, payment_total, payment_method, payment_status, seat } = req.body;

      const setDataBooking = {
        id_user,
        date_booking,
        time_booking,
        id_movie,
        id_schedule,
        total_ticket,
        payment_total,
        payment_method,
        payment_status,
      };

      //MENGUBAH INPUTAN TOTALTICKET BERBENTUK ARRAY MENJADI NUMBER SESUAI LENGTH
      for (data in setDataBooking) {
        setDataBooking.total_ticket = seat.toString().split(",").length;
      }
      const result = await bookingModel.postBooking(setDataBooking);
      console.log(result);

      seat.forEach(async (item) => {
        //AMBIL IDBOOKING DARI RESULT
        const id_booking = result.id_booking;
        const setDataSeat = {
          id_booking,
          id_schedule,
          id_movie,
          date_booking,
          time_booking,
          seat: item,
        };

        await bookingModel.postSeatBooking(setDataSeat);
        console.log(setDataSeat);
      });

      return helperWrapper.response(res, 200, "success create data", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
};
