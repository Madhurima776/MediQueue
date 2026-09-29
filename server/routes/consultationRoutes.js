const express = require("express");

const {
  createConsultation,
  getPatientConsultations
} = require("../controllers/consultationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Doctor creates consultation
router.post(
  "/",
  authMiddleware,
  roleMiddleware("doctor"),
  createConsultation
);

// Patient consultation history
router.get(
  "/patient/:patientId",
  authMiddleware,
  getPatientConsultations
);

module.exports = router;
