/**************************************** */

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// Fonction pour créer automatiquement le dossier si inexistant

// Fonction pour configurer Multer pour chaque type
// function getMulterUpload(folderName) {
//   const uploadPath = path.join(__dirname, "../uploads", folderName);
//   ensureDirExist(uploadPath);

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadPath);
//     },
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

/***************************************** */

// //register user

// routerr.post("/creatuser", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "champs invalide" });
//     }

//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).json({ message: "email existe deja !" });
//     }
//     const hashedPasswor = await bcrypt.hash(password, 10);
//     const newuser = await User.create({ name, email, password: hashedPasswor });

//     const jswonwebToken = jwt.sign({ name, email }, process.env.secretKey, {
//       expiresIn: "24h",
//     });

//     // try {
//         res.status(201)
//           .json({ message: "user register successfully", jswonwebToken, user: newuser });
//     console.log(decoded);
//      } catch (error) {
//        console.log(error);
//         res.status(500).json({ message: "Server error" });
//     }

//     // response
//     // res.status(201).json({
//     //   message: "user register successfully",
//     //   token,
//     //   user: {
//     //     id: newUser._id,
//     //     name: newUser.name,
//     //     email: newUser.email,
//     //   },
//     // });

//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).json({ message: "Server error" });
//   // }
// });

// //login user

// routerr.post('/login' , async(req,res)=>{
//   try {

//   const {email, password} = req.body ;

//   if(!email || !password){
//     res.status(400).json({message:"champs invalid"});
//   }

//   const userexiste = await User.findOne({email:req.body.email});
// if (!userexiste) {
//   res.status(400).json({message:"mail not existe"});
// }

// const ismatch = await bcrypt.compare(password ,userexiste.password);
// if (ismatch) {
//   res.status(200).json({message:"welcom yesr by omar k"});
// }

// } catch (error) {
//      res.status(200).json({message:"user faut "});
//   }

// });

/*******************signup 2************************************/

// //register user signup
// router.post("/register", (req, res) => {
//   bcrypt.hash(req.body.password, 10).then((cruptedPwd) => {
//     let user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: cruptedPwd,
//     });
//     user.save((err, doc) => {
//       if (err) {
//         if (err.errors.email) {
//           res.json({ message: "Email existe" });
//         }
//       } else {
//         res.json({ message: "user added with succes", user: doc });
//       }
//     });
//   });
// });

// //Login user login

// router.post("/login", (req, res) => {
//   let user;
//   User.findOne({ email: req.body.email }).then((doc) => {
//     if (!doc) {
//       res.json({ message: "plaze chek your email" });
//     }
//     user = doc;
//     return bcrypt
//       .compare(req.body.password, doc.password)
//       .then((passworCrepted) => {
//         if (passworCrepted) {
//           let usrTosend = { name: user.name, email: user.email };
//           res.json({ message: "welcom", user: usrTosend });
//         } else {
//           res.json({ message: "plaze chek your email" });
//         }
//       });
//   });
// });

/********************************************************************/

// ajouter doctor 1
// router.post("/doctors", async (req, res) => {
//   const { name, specialty, image, description, experienceYears } = req.body;

//   // 1. Validation des données
//   if (!name || !specialty || !image || !description || !experienceYears) {
//     res.status(400).json({ message: "chmps invalide" });
//   }

//   // 2. Création de l'objet Doctor
//   const newDoctor = new Doctor({
//     name,
//     specialty,
//     image,
//     description,
//     experienceYears,
//   });

//   // 4. Sauvegarde en base
//   Doctor.save((err,doc)=>{
//     if (err) {
//        res.status(400).json({ message: "erreur with db" });
//     } else {
//        res.status(400).json({ message: "saved correcte",doctor:doc });
//     }
//   })

//   // 5. Réponse succès

// });

/***************************ajouter doctor 2*****************************************/

//ajouter doctor
