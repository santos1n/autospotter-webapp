// ./routes/sensors.js
const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    const sensorData = await db.SensorData.findAll(); // Fetch all SensorData
    res.json(sensorData); // Respond with the fetched SensorData
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

router.post("/", async (req, res) => {
  try {
    const { sensorname, sensorstatus } = req.body;

    // Find or create SensorList entry
    let [sensorList] = await db.SensorList.findOrCreate({
      where: { sensorname },
    });

    // Retrieve sensorid
    const sensorId = sensorList.dataValues.sensorid;

    // Check if SensorData entry exists
    const sensorData = await db.SensorData.findOne({
      where: { sensorid: sensorId },
    });

    if (sensorData) {
      // Update sensorstatus and timestamp if SensorData entry exists
      await db.SensorData.update(
        { sensorstatus, timestamp: new Date() },
        { where: { sensorid: sensorId } }
      );
      res.send("Values updated");
    } else {
      // Insert new data if SensorData entry doesn't exist
      await db.SensorData.create({
        sensorid: sensorId,
        sensorstatus,
        timestamp: new Date(),
      });
      res.send("Values inserted");
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

module.exports = router;
