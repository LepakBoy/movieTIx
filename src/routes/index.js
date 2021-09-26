const express = require("express");

const Router = express.Router();
const moiveRoutes = require("../modules/movie/movieRoutes");
const scheduleRoutes = require("../modules/schedule/scheduleRoutes");
const bookingRoutes = require("../modules/booking/bookingRoutes");
const seatRoutes = require("../modules/seatbooking/seatRoutes");

Router.use("/movie", moiveRoutes);
Router.use("/schedule", scheduleRoutes);
Router.use("/booking", bookingRoutes);
Router.use("/seat", seatRoutes);

module.exports = Router;
