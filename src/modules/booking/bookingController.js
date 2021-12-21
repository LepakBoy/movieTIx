const bookingModel = require("./bookingModel");
const scheduleModel = require("../schedule/scheduleModel");
const helperWrapper = require("../../helper/wrapper");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const midtrans = require("../../helper/midtrans");
const sendMail = require("../../helper/email");

module.exports = {
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await bookingModel.getBookingById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found`,
          null
        );
      }

      // UBAH SEAT MENJADI BENTUK ARRAY SESUAI VALUE DAN LENGTH
      const seat = result.map((item) => item.seat);

      const newResult = { ...result[0], seat };
      console.log(newResult);

      return helperWrapper.response(
        res,
        200,
        `succes get data by id`,
        newResult
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        `bad request (${error.message})`,
        null
      );
    }
  },
  getBookingByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await bookingModel.getBookingByIdUser(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          200,
          `data by id ${id} not found`,
          []
        );
      }

      //menyatukan seat berdasarkan id user
      const newResult = [];
      result.forEach((item) => {
        const filterId = newResult.filter(
          (x) => x.id_booking === item.id_booking
        );
        if (filterId.length) {
          const indexResult = newResult.indexOf(filterId[0]);
          newResult[indexResult].seat = newResult[indexResult].seat.concat(
            item.seat
          );
        } else {
          if (typeof item.seat === "string") {
            item.seat = [item.seat];
          }
          newResult.push(item);
        }
      });

      return helperWrapper.response(
        res,
        200,
        `succes get data by id`,
        newResult
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postBooking: async (req, res) => {
    try {
      const {
        id_user,
        date_booking,
        time_booking,
        id_movie,
        id_schedule,
        total_ticket,
        payment_total,
        seat,
      } = req.body;

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
      };

      //MENGUBAH INPUTAN TOTALTICKET BERBENTUK ARRAY MENJADI NUMBER SESUAI LENGTH
      for (data in setDataBooking) {
        setDataBooking.total_ticket = seat.toString().split(",").length;
        setDataBooking.payment_total = setDataBooking.total_ticket * price;
        setDataBooking.id_user = req.decodeToken.id_user;
      }
      // console.log(setDataBooking);

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
      });

      const resultMidtrans = await midtrans.post(
        result.id_booking,
        setDataBooking.payment_total
      );

      //masukan url_redirect ke dalam db
      await bookingModel.paymentUrl(resultMidtrans, result.id_booking);

      return helperWrapper.response(res, 200, "success create data", {
        result,
        redirect_url: resultMidtrans,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postMidtransNotif: async (req, res) => {
    try {
      const result = await midtrans.notif(req.body);
      const {
        order_id: id_booking,
        transaction_status: transactionStatus,
        transaction_time,
        fraud_status: fraudStatus,
        payment_type: payment_method,
      } = result;

      const setData = {
        id_booking,
        payment_method,
        transactionStatus,
      };

      if (transactionStatus == "capture") {
        // capture only applies to card transaction, which you need to check for the fraudStatus
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your databaase to 'challenge'
        } else if (fraudStatus == "accept") {
          // TODO set transaction status on your databaase to 'success'
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your databaase to 'success'

        setData.transactionStatus = "success";
        const newSetdata = {
          ...setData,
          booking_status: "active",
        };
        await bookingModel.midtransNotif(newSetdata);

        const bookingData = await bookingModel.bookingDataEmail(id_booking);
        const bookingDataObj = bookingData[0];

        const setDataEmail = {
          to: bookingDataObj.email,
          subject: "ticket invoice",
          template: "booking-payment",
          data: {
            first_name: bookingDataObj.first_name,
            id_booking,
            transaction_time,
            date_booking: bookingDataObj.date_booking,
            time_booking: bookingDataObj.time_booking,
            id_movie: bookingDataObj.id_movie,
            id_schedule: bookingDataObj.id_schedule,
            total_ticket: bookingDataObj.total_ticket,
            payment_total: bookingDataObj.payment_total,
            payment_method: bookingDataObj.payment_method,
            payment_status: bookingDataObj.payment_status,
          },
          attachment: [
            //   {
            //     filename: "invoice payment success",
            //     // path:
            //   },
          ],
        };

        console.log(setDataEmail);

        await sendMail.bookingPaymentInvoice(setDataEmail);
        return helperWrapper.response(
          res,
          200,
          `succes create your booking`,
          result
        );
      } else if (transactionStatus == "deny") {
        // TODO you can ignore 'deny', because most of the time it allows payment retries
        // and later can become success
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your databaase to 'failure'
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your databaase to 'pending' / waiting payment
      }
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  bookingStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const status = "ticket used";

      // const idd = "bookingID-" + uuidv4();
      // console.log(idd);
      const dataBooking = await bookingModel.getBookingById(id);

      if (dataBooking[0].booking_status !== "active") {
        return helperWrapper.response(res, 400, `ticket cannot be used`, null);
      }
      const result = await bookingModel.updateStatus(status, id);

      return helperWrapper.response(res, 200, "ticket scanned..!", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
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

      // setData.id_movie = Number(id_movie);

      //handle jika ada yang tidak diisi
      for (const data in setData) {
        if (!setData[data]) {
          return helperWrapper.response(
            res,
            400,
            `${data} must be filled`,
            null
          );
        }
      }

      const listMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const result = await bookingModel.dashboard(setData);

      const newResult = [];

      for (const x of listMonth) {
        let item = 0;
        for (const y of result) {
          if (x === y.month) {
            item += 1;
            newResult.push({ month: y.month, total: y.total });
          }
        }
        if (item === 0) {
          newResult.push({ month: x, total: 0 });
        }
      }

      console.log(newResult);

      return helperWrapper.response(res, 200, "dashboard", newResult);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  exportTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const fileName = `ticket-${id}.pdf`;
      //dataBooking: untuk mengambil data dari db yang akan ditampilkan ke pdf
      const dataBooking = await bookingModel.getBookingById(id);
      //mengambil template .ejs yang akan di render ke pdf
      ejs.renderFile(
        path.resolve("./src/template/pdf/ticket.ejs"),
        { dataBooking },
        (error, result) => {
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
            pdf
              .create(result, options)
              .toFile(
                path.resolve(`./public/generate/${fileName}`),
                (error, result) => {
                  console.log(result);
                  if (error) {
                    console.log(error);
                  } else {
                    return helperWrapper.response(
                      res,
                      200,
                      `success export ticket`,
                      {
                        url: `http://localhost:3000/generate/${fileName}`,
                      }
                    );
                    // console.log({
                    //   url: `http://localhost:3000/generate/${fileName}`,
                    // });
                  }
                }
              );
          }
        }
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
};

// const history = {
//   transaction_time: "2021-10-07 10:26:00",
//   transaction_status: "settlement",
//   transaction_id: "4635c091-7702-4c28-954f-1bcdd156d150",
//   status_message: "midtrans payment notification",
//   status_code: "200",
//   signature_key: "134hj234jasdfasd908f70890907908adf8907sdf090asd87fa90s8f78907fas890f789d7f890as7f0",
//   payment_type: "bca_kilkpay",
//   order_id: "10-24910-4",
//   merchant_id: "G13409682",
//   gross_amount: "100000",
//   fraud_status: "accept",
//   currency: "IDR",
//   approval_code: "1123446",
// };
