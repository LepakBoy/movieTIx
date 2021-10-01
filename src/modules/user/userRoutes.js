const express = require("express");

const Router = express.Router();
const userController = require("./userController");
const middlewareAuth = require("../../middleware/auth");
const middlewareUpload = require("../../middleware/uploadUser");

//Q: tambah middleware redis tidak?
Router.get("/all", middlewareAuth.authentication, middlewareAuth.isAdmin, userController.getAllUser);
Router.get("/:id", middlewareAuth.authentication, middlewareAuth.isAdmin, userController.getUserById);
Router.patch("/update-profile", middlewareAuth.authentication, userController.editUser);
Router.patch("/password", middlewareAuth.authentication, userController.changePassword);
Router.patch("/change-photo", middlewareAuth.authentication, middlewareUpload, userController.editUserImage);

module.exports = Router;
