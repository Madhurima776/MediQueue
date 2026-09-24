const express = require("express");

const {
  createConsultation,
  getPatientConsultations
} = require("../controllers/consultationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createConsultation
);

router.get(
  "/patient/:patientId",
  protect,
  getPatientConsultations
);

module.exports = router;