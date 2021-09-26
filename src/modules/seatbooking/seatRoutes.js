const express = require("express");

const Router = express.Router();
const seatController = require("./seatController");

Router.get("/", seatController.getSeat);

module.exports = Router;
