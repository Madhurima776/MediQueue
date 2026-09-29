const CheckIn = require("../models/CheckIn");
const Appointment = require("../models/Appointment");

// Check in a patient
const checkInPatient = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      checkedInBy,
      method
    } = req.body;

    // Check required fields
    if (!appointmentId || !patientId || !checkedInBy) {
      return res.status(400).json({
        message: "Appointment ID, Patient ID and Receptionist ID are required"
      });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    // Check patient
    if (appointment.patientId.toString() !== patientId) {
      return res.status(400).json({
        message: "Patient does not belong to this appointment"
      });
    }

    // Check if already checked in
    const existingCheckIn = await CheckIn.findOne({
      appointmentId,
      status: "checked-in"
    });

    if (existingCheckIn) {
      return res.status(400).json({
        message: "Patient is already checked in"
      });
    }

    // Create check-in
    const checkIn = await CheckIn.create({
      appointmentId,
      patientId,
      checkedInBy,
      method: method || "reception"
    });

    // Update appointment status
    appointment.status = "checked-in";
    await appointment.save();

    res.status(201).json({
      message: "Patient checked in successfully",
      checkIn,
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: "Check-in failed",
      error: error.message
    });
  }
};


// Get check-in details
const getCheckIn = async (req, res) => {
  try {
    const checkIn = await CheckIn.findOne({
      appointmentId: req.params.appointmentId
    });

    if (!checkIn) {
      return res.status(404).json({
        message: "Check-in not found"
      });
    }

    res.json(checkIn);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get check-in details",
      error: error.message
    });
  }
};


module.exports = {
  checkInPatient,
  getCheckIn
};