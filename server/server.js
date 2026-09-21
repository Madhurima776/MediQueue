const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
<<<<<<< HEAD
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
=======
>>>>>>> main

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "MediQueue API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});