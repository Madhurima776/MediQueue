const express = require("express");

const {
  generateQueueToken,
  getDoctorQueue,
  callNextPatient,
  startConsultation,
  completeQueueToken
} = require("../controllers/queueController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateQueueToken
);

router.get(
  "/doctor/:doctorId",
  protect,
  getDoctorQueue
);

router.post(
  "/call-next",
  protect,
  callNextPatient
);

router.put(
  "/:id/start",
  protect,
  startConsultation
);

router.put(
  "/:id/complete",
  protect,
  completeQueueToken
);

module.exports = router;