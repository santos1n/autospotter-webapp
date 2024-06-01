// routes/users.js

const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    const userProfile = await db.Users.findOne({
      order: [["createdAt", "DESC"]],
    });

    console.log("Last User:", userProfile);

    res.status(200).json({ userProfile });
  } catch (error) {
    console.error("Error while fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
