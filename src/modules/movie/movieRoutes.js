const express = require("express");

const Router = express.Router();
const movieController = require("./movieController");
const middlewareAuth = require("../../middleware/auth");
const middlewareRedis = require("../../middleware/redis");
const middlewareUpload = require("../../middleware/uploadMovie");

Router.get("/all", movieController.getAllMovie);
// Router.get("/all", middlewareRedis.getMovieRedis, movieController.getAllMovie);
Router.get(
  "/:id",
  middlewareRedis.getMovieByIdRedis,
  movieController.getMovieById
);
Router.post(
  "/",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearMovieRedis,
  middlewareUpload,
  movieController.postMovie
);
Router.patch(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearMovieRedis,
  middlewareUpload,
  movieController.updateMovie
);
Router.delete(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearMovieRedis,
  movieController.deleteMovie
);
Router.get(
  "/month/:month",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  movieController.getMovieByMonth
);

module.exports = Router;
