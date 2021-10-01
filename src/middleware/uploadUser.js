const multer = require("multer");
const helperWrapper = require("../helper/wrapper");

//lokasi simpen file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/user");
  },
  filename(req, file, cb) {
    console.log(file);
    //regex: ubah titik dua pada nama file menjadi strip -
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

//masukan setingan storage ke multer
const upload = multer({ storage }).single("user_image");

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    next();
  });
};

module.exports = uploadFilter;
