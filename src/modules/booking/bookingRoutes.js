const express = require("express");

const Router = express.Router();
const bookingController = require("./bookingController");
const middlewareAuth = require("../../middleware/auth");

Router.get("/:id", middlewareAuth.authentication, bookingController.getBookingById);
Router.post("/", middlewareAuth.authentication, bookingController.postBooking);
Router.get("/user/:id", middlewareAuth.authentication, bookingController.getBookingByIdUser);
Router.get("/ticket-status/:id", middlewareAuth.authentication, middlewareAuth.isAdmin, bookingController.bookingStatus);
Router.get("/", middlewareAuth.authentication, middlewareAuth.isAdmin, bookingController.getDashboard);
Router.get("/ticket/:id", middlewareAuth.authentication, bookingController.exportTicket);
Router.post("/midtrans-notification", middlewareAuth.authentication, bookingController.postMidtransNotif);

module.exports = Router;
