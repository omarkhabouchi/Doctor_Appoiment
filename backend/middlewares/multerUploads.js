// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// function ensureDirExist(dir) {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
// }

// function getMulterUpload(folderName) {
//   const uploadPath = path.join(__dirname, "../uploads", folderName);
//   ensureDirExist(uploadPath);

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadPath),
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       const ext = path.extname(file.originalname);
//       cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//     },
//   });

//   return multer({ storage });
// }

// module.exports = {
//   uploadDoctor: getMulterUpload("doctors"),
//   uploadDepartment: getMulterUpload("departments"),
//   uploadAppointment: getMulterUpload("appointments"),
// };
