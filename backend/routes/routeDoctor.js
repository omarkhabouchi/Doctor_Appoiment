const express = require("express");
const router = express.Router();
const multer = require("multer");
const Doctor = require("../models/DoctorSchema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/.imagesUploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

//ajouter doctor
router.post("/addDoctor", upload.single("image"), async (req, res) => {
  try {
    const { name, specialty, description, experienceYears } = req.body;

    const image = req.file ? req.file.filename : null;

    // 1. Validation des données
    if (!name || !specialty || !image || !description || !experienceYears) {
      return res.status(400).json({ message: "chmps invalide" });
    }

    // 2. Création de l'objet Doctor
    const newDoctor = new Doctor({
      name,
      specialty,
      image: req.file?.fieldname,
      description,
      experienceYears,
    });

    // 4. Sauvegarde en base
    const savedDoctor = await newDoctor.save();

    // 5. Réponse succès
    return res.status(201).json({
      message: "Doctor saved successfully",
      doctor: savedDoctor,
    });
  } catch (error) {
    //console.error(error);
    console.error("Erreur création docteur:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//get all
router.get("/allDoctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json({ message: doctors });
});

//get byId
router.get("/doctor/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params._id);

  if (!doctor) {
    return res.status(404).json({ message: "doctor not found" });
  }
  res.status(200).json(doctor);
});

//modifier doctor
router.put("/doctors", (req, res) => {});

//delete doctor
router.delete("/doctors", (req, res) => {});

module.exports = router;
