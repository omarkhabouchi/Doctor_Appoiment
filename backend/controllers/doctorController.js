// const Doctor = require("../models/Doctor");

// exports.addDoctor = async (req, res) => {
//   const { name, specialty, description, experienceYears } = req.body;
//   const image = req.file.filename;

//   const newDoctor = new Doctor({ name, specialty, description, experienceYears, image });
//   const savedDoctor = await newDoctor.save();

//   res.status(201).json({ message: "Docteur créé avec succès", doctor: savedDoctor });
// };

//Exemple Route – index.js

// const express = require("express");
// const router = express.Router();
// const asyncHandler = require("../middlewares/asyncHandler");
// const validateFields = require("../middlewares/validateFields");
// const { uploadDoctor, uploadDepartment } = require("../middlewares/multerUploads");
// const doctorController = require("../controllers/doctorController");
// const departmentController = require("../controllers/departmentController");

// // Route Doctor
// router.post(
//   "/addDoctor",
//   uploadDoctor.single("image"),
//   validateFields(["name", "specialty", "description", "experienceYears", "image"]),
//   asyncHandler(doctorController.addDoctor)
// );

// // Route Department
// router.post(
//   "/createDepartment",
//   uploadDepartment.single("image"),
//   validateFields(["name", "description", "image"]),
//   asyncHandler(departmentController.addDepartment)
// );

// module.exports = router;

//Dans app.js

// const express = require("express");
// const path = require("path");
// const app = express();
// const routes = require("./routes/index");

// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // accès images
// app.use("/api", routes);

// // Middleware global pour gérer les erreurs
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Erreur serveur" });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));
