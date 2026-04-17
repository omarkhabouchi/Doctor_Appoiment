const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");

//register user

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, roles = "user" } = req.body;

    // 1. Validation des données
    if (!name || !email || !password) {
      return res.status(400).json({ message: "champs requis manquants" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "email existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    let token = jwt.sign(
      { email, id: newUser._id, name: newUser.name, role: newUser.roles },
      process.env.secretKey,
      {
        expiresIn: "1w",
      },
    );
    res.status(201).json({
      message: "user register successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.roles,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("email or password incorrect ");
  }

  const userLogin = await User.findOne({ email });
  if (!userLogin) {
    return res.status(400).json({ message: "user not found " });
  }

  const match = await bcrypt.compare(password, userLogin.password);
  if (!match) {
    return res.status(400).json({ message: "password is not corret " });
  }

  let token = jwt.sign(
    {
      email: userLogin.email,
      id: userLogin._id,
      name: userLogin.name,
      role: userLogin.roles,
    },
    process.env.secretKey,
    { expiresIn: "1w" },
  );
  return res.status(201).json({
    message: "user is connected succesfuly",
    token,
    user: {
      id: userLogin._id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.roles,
    },
  });
});

// router.get("/allusers", async (req, res) => {
//   try {
//     const Userscount = await User.countDocuments();
//     res.json({Userscount});
//   } catch (error) {
//     res.status(400).json({ message: "user not found " });
//   }
// });
module.exports = router;
