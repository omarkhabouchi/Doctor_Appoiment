const express = require("express");
const router = express.Router();
const multer = require("multer");
const Doctor = require("../models/DoctorSchema");
const path = require("path");

// =====================
// MULTER CONFIG FIXED
// =====================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imagesUploads/"); // ✅ FIXED (no / at start)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage });

// =====================
// ADD DOCTOR
// =====================

router.post("/addDoctor", upload.single("image"), async (req, res) => {
  try {
    const { name, specialty, description, experienceYears } = req.body;

    // get image filename
    const image = req.file ? req.file.filename : null;

    // validation
    if (!name || !specialty || !description || !experienceYears || !image) {
      return res.status(400).json({ message: "Champs invalides" });
    }

    // create doctor
    const newDoctor = new Doctor({
      name,
      specialty,
      description,
      experienceYears,
      image: image, // ✅ FIXED (not fieldname)
    });

    const savedDoctor = await newDoctor.save();

    return res.status(201).json({
      message: "Doctor saved successfully",
      doctor: savedDoctor,
    });
  } catch (error) {
    console.error("Erreur création docteur:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// =====================
// GET ALL DOCTORS
// =====================

router.get("/allDoctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// =====================
// GET DOCTOR BY ID
// =====================

router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// UPDATE DOCTOR
// =====================

router.put("/doctor/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor" });
  }
});

// =====================
// DELETE DOCTOR
// =====================

router.delete("/doctor/:id", async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor" });
  }
});

// =====================
// COUNT DOCTORS
// =====================

router.get("/count", async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors count" });
  }
});

//recher by specilty

router.get("/bySpecialty/:specialty", async (req, res) => {
  try {
    const { specialty } = req.params;
    console.log("Searching for specialty:", specialty);
    const doctors = await Doctor.find({
      specialty: { $regex: new RegExp(specialty, "i") },
    });

    console.log("Found doctors:", doctors.length);
    res.json(doctors);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

///////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Doctor = require("../models/DoctorSchema");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/.imagesUploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

// //ajouter doctor
// router.post("/addDoctor", upload.single("image"), async (req, res) => {
//   try {
//     const { name, specialty, description, experienceYears } = req.body;

//     const image = req.file ? req.file.filename : null;

//     // 1. Validation des données
//     if (!name || !specialty || !image || !description || !experienceYears) {
//       return res.status(400).json({ message: "chmps invalide" });
//     }

//     // 2. Création de l'objet Doctor
//     const newDoctor = new Doctor({
//       name,
//       specialty,
//       image: req.file?.fieldname,
//       description,
//       experienceYears,
//     });

//     // 4. Sauvegarde en base
//     const savedDoctor = await newDoctor.save();

//     // 5. Réponse succès
//     return res.status(201).json({
//       message: "Doctor saved successfully",
//       doctor: savedDoctor,
//     });
//   } catch (error) {
//     //console.error(error);
//     console.error("Erreur création docteur:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// //get all
// router.get("/allDoctors", async (req, res) => {
//   const doctors = await Doctor.find();
//   res.json({ doctors });
// });

// //get byId
// router.get("/doctor/:id", async (req, res) => {
//   const doctor = await Doctor.findById(req.params.id);

//   if (!doctor) {
//     return res.status(404).json({ message: "doctor not found" });
//   }
//   res.status(200).json(doctor);
// });

// //modifier doctor
// router.put("/doctors", (req, res) => {});

// //delete doctor
// router.delete("/doctors", (req, res) => {});

// //get count doctor
// router.get("/count", async (req, res) => {
//   try {
//     const count = await Doctor.countDocuments();
//     res.json({ count });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching doctors count " });
//   }
// });
// module.exports = router;
/////////////////////////////////////////////////////////////////
