const multer = require("multer");
const helperWrapper = require("../helper/wrapper");

//lokasi simpen file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/movie");
  },
  filename(req, file, cb) {
    console.log(file);
    //regex: ubah titik dua pada nama file menjadi strip -
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

//masukan setingan storage ke multer

const upload = multer({
  storage,
  limits: { size: 1024 * 1024 },
  //filter format file gambar
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error(`Only .png, .jpg, .jpeg format allowed!`));
    }
  },
}).single("image");

//.single : untuk upload file tapi hanya satu file
//. array : upload lebih dari satu file
//.fileds : upload file lebih dari satu field(untuk lebih dari satu properti)
//.image harus sesuai dengan di postman

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return helperWrapper.response(res, 401, "file to large, max image size is 1 mb", null);
    } else if (err) {
      // An unknown error occurred when uploading.
      return helperWrapper.response(res, 401, err.message, null);
    }
    next();
  });
};

module.exports = uploadFilter;
