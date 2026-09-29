const express = require("express");

const {
  checkInPatient,
  getCheckIn
} = require("../controllers/checkinController");

const router = express.Router();

router.post("/", checkInPatient);

router.get("/:appointmentId", getCheckIn);

module.exports = router;