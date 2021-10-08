const bookingModel = require("./bookingModel");
const scheduleModel = require("../schedule/scheduleModel");
const helperWrapper = require("../../helper/wrapper");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const midtrans = require("../../helper/midtrans");

module.exports = {
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await bookingModel.getBookingById(id);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }

      //UBAH SEAT MENJADI BENTUK ARRAY SESUAI VALUE DAN LENGTH
      let getSeat = result.map((item) => {
        for (data in item) {
          data += item.seat;
        }
        return data;
      });
      // console.log(getSeat);
      result.map((dataResult) => {
        dataResult.seat = getSeat;
      });

      return helperWrapper.response(res, 200, `succes get data by id`, result[0]);
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

      //menyatukan seat berdasarkan id user
      const newResult = [];
      result.forEach((item) => {
        const filterId = newResult.filter((x) => x.id_booking === item.id_booking);
        if (filterId.length) {
          const indexResult = newResult.indexOf(filterId[0]);
          newResult[indexResult].seat = newResult[indexResult].seat.concat(item.seat);
        } else {
          if (typeof item.seat === "string") {
            item.seat = [item.seat];
          }
          newResult.push(item);
        }
      });

      return helperWrapper.response(res, 200, `succes get data by id`, newResult);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  postBooking: async (req, res) => {
    try {
      const { id_user, date_booking, time_booking, id_movie, id_schedule, total_ticket, payment_total, payment_method, payment_status, seat } = req.body;

      //ambil harga dari tabel schedule
      const dataSchedule = await scheduleModel.getScheduleById(id_schedule);
      const price = dataSchedule[0].price;

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
        setDataBooking.payment_total = setDataBooking.total_ticket * price;
      }

      const result = await bookingModel.postBooking(setDataBooking);

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
      });

      const resultMidtrans = await midtrans.post(result.id_booking, setDataBooking.payment_total);

      // id = "12315";
      // amount = 100000;
      // const resultMidtrans = await midtrans.post(id, amount);

      //masukan url_redirect ke dalam db terlebih dahulu ====================

      return helperWrapper.response(res, 200, "success create data", { result, redirect_url: resultMidtrans });
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  bookingStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const status = "ticket used";
      const result = await bookingModel.updateStatus(status, id);

      return helperWrapper.response(res, 200, "ticket scanned..!", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  getDashboard: async (req, res) => {
    try {
      const { id_movie, location, teater_name } = req.query;
      const setData = {
        id_movie,
        location,
        teater_name,
      };

      setData.id_movie = Number(id_movie);

      //handle jika ada yang tidak diisi
      for (const data in setData) {
        if (!setData[data]) {
          return helperWrapper.response(res, 400, `${data} must be filled`, null);
        }
      }

      const result = await bookingModel.dashboard(setData);

      const listMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      // console.log(result);
      for (const data of result) {
        data.month = listMonth[result[0].month - 1];
      }

      return helperWrapper.response(res, 200, "dashboard", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  exportTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const fileName = `ticket-${id}.pdf`;
      //dataBooking: untuk mengambil data dari db yang akan ditampilkan ke pdf
      const dataBooking = await bookingModel.getBookingById(id);
      //mengambil template .ejs yang akan di render ke pdf
      ejs.renderFile(path.resolve("./src/template/pdf/ticket.ejs"), { dataBooking }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          //options : settingan ukuran/bentuk pdf || diambil dari dokumentasi medium.com
          let options = {
            height: "11.25in",
            width: "8.5in",
            header: {
              height: "20mm",
            },
            footer: {
              height: "20mm",
            },
          };
          //pdf.create: render file ke pdf => param1=diambil dari hasil getdata db(berhasil mengambil dataBooking baris 162 maka disimpan didalam result), param2=setingan yang akan diimpelementasi ke pdf
          //.toFile: lokasi file pdf yang telah dirender
          pdf.create(result, options).toFile(path.resolve(`./public/generate/${fileName}`), (error, result) => {
            console.log(result);
            if (error) {
              console.log(error);
            } else {
              return helperWrapper.response(res, 200, `success export ticket`, {
                url: `http://localhost:3000/generate/${fileName}`,
              });
              // console.log({
              //   url: `http://localhost:3000/generate/${fileName}`,
              // });
            }
          });
        }
      });
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
};
