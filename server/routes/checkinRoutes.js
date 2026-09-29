const express = require("express");

const {
  checkInPatient,
  getCheckIn,
  getTodayAppointments
} = require("../controllers/checkinController");

const router = express.Router();

// Get today's appointments
router.get("/appointments", getTodayAppointments);

// Check in a patient
router.post("/", checkInPatient);

// Get check-in details
router.get("/:appointmentId", getCheckIn);

module.exports = router;