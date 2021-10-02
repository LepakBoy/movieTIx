const multer = require("multer");
const helperWrapper = require("../helper/wrapper");

//lokasi simpen file
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/user");
  },
  filename(req, file, cb) {
    console.log(file);

    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  //filter format file gambar
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error(`Only .png, .jpg, .jpeg format allowed!`));
    }
  },
}).single("user_image");

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return helperWrapper.response(res, 401, err.message, null);
    } else if (err) {
      return helperWrapper.response(res, 401, err.message, null);
    }
    next();
  });
};

module.exports = uploadFilter;

// limits: (req, file, cb) => {
//   if (file.size < 10) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     return cb(new Error(`kegedean`));
//   }
// },
