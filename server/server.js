const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
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
    origin: "*"
  }
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
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/queue", queueRoutes);
app.use(
  "/api/consultations",
  consultationRoutes
);

app.get("/", (req, res) => {
  res.json({
    message: "MediQueue Server is running successfully!"
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(
    `MediQueue server running on http://localhost:${PORT}`
  );
});