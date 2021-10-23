const express = require("express");

const Router = express.Router();
const scheduleController = require("./scheduleController");
const middlewareAuth = require("../../middleware/auth");
const middlewareRedis = require("../../middleware/redis");

//redis dimatikan karna jika get data schedule dari redis bentuk time_schedule berubah menjadi string||yang diinginkan : array
// Router.get("/all", middlewareRedis.getScheduleRedis, scheduleController.getAllSchedule);
Router.get("/all", scheduleController.getAllSchedule);
Router.get("/:id", middlewareAuth.authentication, middlewareAuth.isAdmin, middlewareRedis.getScheduleByIdRedis, scheduleController.getScheduleById);
Router.post("/", middlewareAuth.authentication, middlewareAuth.isAdmin, middlewareRedis.clearScheduleRedis, scheduleController.postSchedule);
Router.patch("/:id", middlewareAuth.authentication, middlewareAuth.isAdmin, middlewareRedis.clearScheduleRedis, scheduleController.updateSchedule);
Router.delete("/:id", middlewareAuth.authentication, middlewareAuth.isAdmin, middlewareRedis.clearScheduleRedis, scheduleController.deleteSchedule);

module.exports = Router;
