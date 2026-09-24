const express = require("express");

const {
  createDoctor,
  getDoctors,
  getDoctorById
} = require("../controllers/doctorController");

const router = express.Router();

router.post("/", createDoctor);

router.get("/", getDoctors);

router.get("/:id", getDoctorById);

module.exports = router;