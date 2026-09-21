const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
connectDB();

const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);

app.use(
  "/api/departments",
  departmentRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.get("/", (req, res) => {
  res.send("MediQueue API is running...");
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});