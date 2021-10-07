const express = require("express");

const Router = express.Router();
const authController = require("./authController");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.post("/logout", authController.logout);
Router.post("/refresh-token", authController.refreshToken);
// Router.patch("/activate-account")

module.exports = Router;
