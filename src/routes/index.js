const express = require("express");

const Router = express.Router();
const moiveRoutes = require("../modules/movie/movieRoutes");
const scheduleRoutes = require("../modules/schedule/scheduleRoutes");

Router.use("/movie", moiveRoutes);
Router.use("/schedule", scheduleRoutes);

module.exports = Router;
