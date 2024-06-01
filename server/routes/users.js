// routes/users.js

const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for storing uploaded files
    cb(null, "uploads/"); // Create a folder named 'uploads' in your project directory
  },
  filename: function (req, file, cb) {
    // Define how files should be named
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer instance with defined storage
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.Users.findAll();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// Signup route
router.post("/signup", upload.single("image"), async (req, res) => {
  try {
    const { username, email, password, contact, vehicle } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the path of the uploaded file, if it exists
    const imagePath = req.file ? req.file.path : null;

    // Create a new user with all details
    const newUser = await db.Users.create({
      username,
      email,
      password: hashedPassword,
      contact,
      vehicle,
      image: imagePath,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await db.Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
