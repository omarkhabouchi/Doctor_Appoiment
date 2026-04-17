const express = require("express");
const router = require("./routeAppointment");
const Department = require("../models/DepatrtmentSchema");
//const path = require("path");
const multer = require("multer");
const auth = require("../auth/middleware");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/imagesUploads");
    // ⚠️ Ici, il vaut mieux mettre un chemin absolu ou relatif correct
    //cb(null, path.join(__dirname, "../imagesUploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // ⚠️ On conserve l'extension originale du fichier
    //const ext = path.extname(file.originalname);
    //cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

//Ajouter Department
router.post(
  "/createDepartment",
  auth("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      // if (req.user.role !== "admin") {
      //   return res.status(403).json({ message: "Not Authorized" });
      // }
      const { name, description } = req.body;
      const image = req.file ? req.file.filename : null;

      // Validation des champs
      if (!name || !description || !image) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      // Création et sauvegarde du département
      const newDepartment = new Department({
        name,
        description,
        image: req.file?.filename,
      });

      const savedDepartment = await newDepartment.save();

      // Réponse succès
      return res.status(201).json({
        message: "Département créé avec succès",
        department: savedDepartment,
      });
    } catch (error) {
      console.error("Erreur création département:", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
);

//get Department
router.get("/get", (req, res) => {});

//modifier Department
router.put("/put", (req, res) => {});

//supprimer Department
router.delete("/delet", (req, res) => {});

//get count deppartments
router.get("/countdepa", async (req, res) => {
  try {
    const count = await Department.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching department count " });
  }
});

router.get("/Alldepartments", async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departemets" });
  }
});

module.exports = router;
