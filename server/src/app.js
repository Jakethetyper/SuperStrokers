const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTES
app.get("/test", (req, res) => {
  res.json({ message: "Server is working 🚀" });
});

// REAL ROUTES
app.use("/api/auth", authRoutes);

module.exports = app;
