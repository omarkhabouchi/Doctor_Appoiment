const express = require("express");
const router = express.Router();
const Appointment = require("../models/AppointmentSchema");
const auth = require("../auth/middleware");

//Ajouter Appointmen
router.post("/createAppointment", auth, async (req, res) => {
  try {
    const { doctor, date, reason } = req.body;

    if (!doctor || !date || !reason) {
      return res.status(400).json({ message: "champs invalid" });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      doctor,
      date,
      reason,
    });

    // 5. Réponse succès
    return res.status(201).json(appointment);
  } catch (error) {
    console.error("Create appointment error:", error);
    return res.status(500).json({
      success: false,
      message: "errur server",
    });
  }
});

//modifier Appointmen
router.put("/", (req, res) => {});

//get Appointmen
router.get("/myAppointmens", auth, async (req, res) => {
  try {
    const appointmens = await Appointment.find({ user: req.user.id }).populate(
      "doctor",
    );
    res.json({ message: appointmens });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: " not found " });
  }
});

//delete Appointmen
router.delete("/appointmen/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointmen = await Appointment.findByIdAndDelete(id);
    if (!appointmen) {
      res
        .status(400)
        .json({ success: false, message: "Appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Delete appointment error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;

// router.post("/doctors", async (req, res) => {
//   try {
//     const { name, specialty, image, description, experienceYears } = req.body;

//     // 1. Validation des données
//     if (!name || !specialty || !image || !description || !experienceYears) {
//       return res.status(400).json({ message: "chmps invalide" });
//     }

//     // 2. Création de l'objet Doctor
//     const newDoctor = new Doctor({
//       name,
//       specialty,
//       image,
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
