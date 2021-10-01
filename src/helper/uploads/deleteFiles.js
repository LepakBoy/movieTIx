const fs = require("fs");
const helperWrapper = require("../wrapper/index");

const deleteFile = (filePath) => {
  //fs.existSync : cek keberadaan file berdasarkan file path

  if (fs.existsSync("public/uploads/user")) {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.log("ada");
        // return helperWrapper.response(res, 400, err.message, null);
      }
    });
  } else {
    console.log("ga ada");
    // return helperWrapper.response(res, 400, "file tidak ada", null);
  }
  //fs.unlink : untuk hapus file berdasarkan file path
};

//   if (fs.existsSync(filePath)) {
//     fs.unlink(filePath, (error) => {
//       if (error) {
//         console.log("file deleted");
//         throw error;
//       }
//     });
//   } else {
//     console.log(`no file yet`);
//   }
//   //fs.unlink : untuk hapus file berdasarkan file path
// };

module.exports = deleteFile;
