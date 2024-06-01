const express = require("express");
const router = express.Router();
const { Ticket } = require("../models");
const db = require("../models");

// Route to handle ticket creation
router.post("/create-ticket", async (req, res) => {
  try {
    // Retrieve form data from the request body including userId
    const {
      ticketname,
      ticketspot,
      ticketcontact,
      ticketemail,
      ticketvehicle,
      userId,
    } = req.body;

    // Insert ticket details into the database using Sequelize
    const newTicket = await Ticket.create({
      ticketname,
      ticketspot,
      ticketcontact,
      ticketemail,
      ticketvehicle,
      UserId: userId, // Ensure UserId is correctly assigned here
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

router.get("/newticket", async (req, res) => {
  try {
    const lastTicket = await db.Ticket.findOne({
      order: [["createdAt", "DESC"]], // Retrieve the last ticket based on createdAt timestamp
    });

    console.log("Last Ticket:", lastTicket); // Log the last ticket retrieved

    res.status(200).json({ lastTicket });
  } catch (error) {
    console.error("Error while fetching last ticket:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
