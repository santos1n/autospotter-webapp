const express = require("express");
const router = express.Router();
const db = require("../models");

// Authenticate Admin
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find admin by name
    const admin = await db.UserAdmin.findOne({ where: { name } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare passwords
    const passwordMatch = password === admin.password;

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/admin-data", async (req, res) => {
  try {
    const users = await db.Users.findAll();
    const tickets = await db.Ticket.findAll();
    const sensorData = await db.SensorData.findAll({
      include: [{ model: db.SensorList }],
    });
    const userCount = await db.Users.count();
    const ticketCount = await db.Ticket.count();

    res
      .status(200)
      .json({ users, tickets, sensorData, userCount, ticketCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // Convert to integer
    console.log(typeof userId);

    // Find the user by ID
    const user = await db.Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Perform deletion
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
