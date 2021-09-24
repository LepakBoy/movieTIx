const movieModel = require("./movieModel");
const helperWrapper = require("../../helper/wrapper");

module.exports = {
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, name, order, sort } = req.query;
      page = Number(page);
      limit = Number(limit);

      //KENDALA : menentukan nilai default dan handle untuk berbagai keadaan kalo valuenya ada yang kosong
      if (!name) {
        name = "";
      }
      if (!limit) {
        limit = 10;
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
      const totalData = await movieModel.getCountMovie();
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await movieModel.getAllMovie(limit, offset, name, order, sort);

      return helperWrapper.response(res, 200, `success get all data`, result, pageInfo);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await movieModel.getMovieById(id);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }
      return helperWrapper.response(res, 200, `success get data by id`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  getMovieByName: async (req, res) => {
    try {
      const { name } = req.params;
      const result = await movieModel.getMovieByName(name);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `data by name ${id} not found`, null);
      }
      return helperWrapper.response(res, 200, `success get data by name`, result);
    } catch (error) {
      return helperWrapper.response(res, `bad request (${error.message})`, null);
    }
  },
  postMovie: async (req, res) => {
    try {
      const { movie_name, director, releaseDate, category, cast, duration, synopsis } = req.body;
      const setData = {
        movie_name,
        director,
        releaseDate,
        category,
        cast,
        duration,
        synopsis,
      };

      const result = await movieModel.postMovie(setData);
      return helperWrapper.response(res, 200, `success create data`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad request (${error.message})`, null);
    }
  },
  updateMovie: async (req, res) => {
    //KENDALA : kalo value kosong saat isi form update, value databse juga menjadi kosong
    try {
      const { id } = req.params;
      const checkId = await movieModel.getMovieById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }
      const { movie_name, director, releaseDate, category, cast, duration, synopsis } = req.body;
      const setData = {
        movie_name,
        director,
        releaseDate,
        category,
        cast,
        duration,
        synopsis,
        updatedAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
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
        return helperWrapper.response(res, 404, `data by id ${id} not found`, null);
      }
      const result = await movieModel.deleteMovie(id);
      return helperWrapper.response(res, 200, `success delete data id ${id}`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `bad requset (${error.message})`);
    }
  },
};
