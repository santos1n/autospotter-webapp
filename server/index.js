const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const db = require("./models");

// Router
const sensorRouter = require("./routes/sensors");
const userRoutes = require("./routes/users");
const ticketRoutes = require("./routes/tickets");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/tickets", ticketRoutes);
app.use("/users", userRoutes);
app.use("/sensors", sensorRouter);

const PORT = 8001;

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
