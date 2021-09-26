const express = require("express");

const Router = express.Router();
const bookingController = require("./bookingController");

Router.get("/:id", bookingController.getBookingById);
Router.post("/", bookingController.postBooking);
Router.get("/user/:id", bookingController.getBookingByIdUser);

module.exports = Router;