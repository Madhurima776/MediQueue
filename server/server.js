const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// M1 - Authentication
app.use("/api/auth", authRoutes);

// M2 - Patient & Appointments
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/appointments", appointmentRoutes);

// M6 - Admin
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "MediQueue API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});