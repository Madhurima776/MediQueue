const express = require("express");

const {
  bookAppointment,
  getMyAppointments
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  bookAppointment
);

router.get(
  "/my",
  authMiddleware,
  getMyAppointments
);

module.exports = router;
