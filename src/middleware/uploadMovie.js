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
const upload = multer({ storage }).single("image");

//.single : untuk upload file tapi hanya satu file
//. array : upload lebih dari satu file
//.fileds : upload file lebih dari satu field(untuk lebih dari satu properti)
//.image harus sesuai dengan di postman

//tambah 2 proses : file size limit dan extension

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
