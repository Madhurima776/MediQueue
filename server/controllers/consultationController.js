const Consultation = require("../models/Consultation");
const Appointment = require("../models/Appointment");


// Create consultation
const createConsultation = async (req, res) => {
  try {
    const {
      appointmentId,
      symptoms,
      diagnosis,
      prescription,
      notes,
      followUpDate
    } = req.body;

    const appointment = await Appointment.findById(
      appointmentId
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    const consultation = await Consultation.create({
      appointment: appointment._id,
      patient: appointment.patient,
      doctor: appointment.doctor,
      symptoms,
      diagnosis,
      prescription,
      notes,
      followUpDate
    });

    appointment.status = "COMPLETED";

    await appointment.save();

    res.status(201).json({
      message: "Consultation saved successfully",
      consultation
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get patient's consultations
const getPatientConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      patient: req.params.patientId
    })
      .populate("doctor")
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      consultations
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  createConsultation,
  getPatientConsultations
};