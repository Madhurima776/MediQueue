const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const queueRoutes = require("./routes/queueRoutes");
const consultationRoutes = require("./routes/consultationRoutes");

dotenv.config();

connectDB();

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinDoctorQueue", (doctorId) => {
    socket.join(`doctor-${doctorId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// M1 - Authentication
app.use("/api/auth", authRoutes);

// M2 - Patient & Appointments
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/appointments", appointmentRoutes);

// M3 - Queue
app.use("/api/queue", queueRoutes);

// M4 - Consultation
app.use("/api/consultations", consultationRoutes);

// M6 - Admin
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "MediQueue API is running",
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`MediQueue server running on http://localhost:${PORT}`);
});