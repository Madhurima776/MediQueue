const express = require("express");

const {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  checkInAppointment
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/check-in", protect, checkInAppointment);
// Book appointment
router.post("/", protect, createAppointment);


// Get logged-in patient's appointments
router.get("/my", protect, getMyAppointments);


// Get single appointment
router.get("/:id", protect, getAppointmentById);


// Cancel appointment
router.put("/:id/cancel", protect, cancelAppointment);


module.exports = router;