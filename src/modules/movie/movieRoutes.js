const express = require("express");

const Router = express.Router();
const movieController = require("./movieController");

Router.get("/all", movieController.getAllMovie);
Router.get("/:id", movieController.getMovieById);
Router.get("/name/:name", movieController.getMovieByName);
Router.post("/", movieController.postMovie);
Router.patch("/:id", movieController.updateMovie);
Router.delete("/:id", movieController.deleteMovie);

module.exports = Router;
