const movieModel = require("./movieModel");
const helperWrapper = require("../../helper/wrapper");
const redis = require("../../config/redis");
const deleteFile = require("../../helper/uploads/deleteFiles");

module.exports = {
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, name, order, sort, filter } = req.query;
      page = Number(page);
      limit = Number(limit);
      filter = Number(filter);

      if (!filter) {
        filter = "";
      }
      if (!name) {
        name = "";
      }
      if (!limit) {
        limit = 20;
      }
      if (!page) {
        page = 1;
      }
      if (!order) {
        order = "movie_name";
      }
      if (!sort) {
        sort = "ASC";
      }

      const offset = page * limit - limit;
      const totalData = await movieModel.getCountMovie(name, filter);
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await movieModel.getAllMovie(
        limit,
        offset,
        name,
        order,
        sort,
        filter
      );

      //set ke dalam redis
      redis.setex(
        `getMovie:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      );

      return helperWrapper.response(
        res,
        200,
        `success get all data`,
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        `bad request (${error.message})`,
        null
      );
    }
    z;
  },
  getMovieByMonth: async (req, res) => {
    try {
      const { month } = req.params;
      const result = await movieModel.getMovieMonth(month);
      return helperWrapper.response(res, 200, `success get all data`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        `bad request (${error.message})`,
        null
      );
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await movieModel.getMovieById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found`,
          null
        );
      }

      //proses simpan data ke redis
      redis.setex(`getMovie:${id}`, 3600, JSON.stringify(result));
      return helperWrapper.response(res, 200, `success get data by id`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        `bad request (${error.message})`,
        null
      );
    }
  },
  getMovieByName: async (req, res) => {
    try {
      const { name } = req.params;
      const result = await movieModel.getMovieByName(name);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by name ${id} not found`,
          null
        );
      }
      return helperWrapper.response(
        res,
        200,
        `success get data by name`,
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postMovie: async (req, res) => {
    try {
      const {
        movie_name,
        director,
        releaseDate,
        category,
        cast,
        duration,
        synopsis,
      } = req.body;
      const setData = {
        movie_name,
        director,
        releaseDate,
        category,
        cast,
        duration,
        synopsis,
        image: req.file ? req.file.filename : null,
      };

      const result = await movieModel.postMovie(setData);
      return helperWrapper.response(res, 200, `success create data`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params;
      //untuk mendapatkan nama file image di tabel database
      const checkId = await movieModel.getMovieById(id);

      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found`,
          null
        );
      }
      const {
        movie_name,
        director,
        releaseDate,
        category,
        cast,
        duration,
        synopsis,
      } = req.body;
      const setData = {
        movie_name,
        director,
        releaseDate,
        category,
        cast,
        duration,
        synopsis,
        image: req.file ? req.file.filename : null,
        updatedAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      //hapus file sebelumnya
      //chekId[0].image : nama file image yang didapat dari chekId indeks ke
      //tambah kondisi apakah chekID[0] ada isinyan atau tidak

      // if (!setData.image) {
      //   return helperWrapper.response(res, 400, `no image selected...image didn't changed`, null);
      // }

      if (checkId[0].image && req.file) {
        deleteFile(`public/uploads/movie/${checkId[0].image}`);
      }

      const result = await movieModel.updateMovie(setData, id);
      return helperWrapper.response(res, 200, `success update data`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`);
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getMovieById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found`,
          null
        );
      }

      //tambah kondisi apakah chekID[0] ada isinyan atau tidak
      if (checkId[0].image && req.file) {
        deleteFile(`public/uploads/movie/${checkId[0].image}`);
      }

      const result = await movieModel.deleteMovie(id);
      return helperWrapper.response(
        res,
        200,
        `success delete data id ${id}`,
        result
      );
    } catch (error) {
      return helperWrapper.response(res, 400, `bad requset (${error.message})`);
    }
  },
};
