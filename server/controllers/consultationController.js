const Consultation = require("../models/Consultation");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// CREATE CONSULTATION - Doctor only
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

    if (!appointmentId) {
      return res.status(400).json({
        message: "Appointment ID is required"
      });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    // Find doctor profile of logged-in doctor
    const doctor = await Doctor.findOne({
      userId: req.user.userId
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found"
      });
    }

    // Check whether appointment belongs to this doctor
    if (
      appointment.doctorId.toString() !==
      doctor._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not authorized to consult this appointment"
      });
    }

    // Check whether consultation already exists
    const existingConsultation = await Consultation.findOne({
      appointment: appointment._id
    });

    if (existingConsultation) {
      return res.status(400).json({
        message: "Consultation already exists for this appointment"
      });
    }

    // Create consultation
    const consultation = await Consultation.create({
      appointment: appointment._id,
      patient: appointment.patientId,
      doctor: appointment.doctorId,
      symptoms,
      diagnosis,
      prescription,
      notes,
      followUpDate
    });

    // Mark appointment as completed
    appointment.status = "completed";
    await appointment.save();

    res.status(201).json({
      message: "Consultation created successfully",
      consultation
    });
  } catch (error) {
    console.error("Create consultation error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET PATIENT CONSULTATION HISTORY
const getPatientConsultations = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Patient can view only their own consultation history
    if (req.user.role === "patient") {
      if (req.user.userId.toString() !== patientId.toString()) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      const consultations = await Consultation.find({
        patient: patientId
      })
        .populate({
          path: "doctor",
          populate: {
            path: "userId",
            select: "name email"
          }
        })
        .populate("appointment")
        .sort({ createdAt: -1 });

      return res.status(200).json(consultations);
    }

    // Doctor can view consultations only for their own patients
    if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({
        userId: req.user.userId
      });

      if (!doctor) {
        return res.status(404).json({
          message: "Doctor profile not found"
        });
      }

      const consultations = await Consultation.find({
        patient: patientId,
        doctor: doctor._id
      })
        .populate({
          path: "doctor",
          populate: {
            path: "userId",
            select: "name email"
          }
        })
        .populate("appointment")
        .sort({ createdAt: -1 });

      return res.status(200).json(consultations);
    }

    // Admin can view patient consultation history
    if (req.user.role === "admin") {
      const consultations = await Consultation.find({
        patient: patientId
      })
        .populate({
          path: "doctor",
          populate: {
            path: "userId",
            select: "name email"
          }
        })
        .populate("appointment")
        .sort({ createdAt: -1 });

      return res.status(200).json(consultations);
    }

    return res.status(403).json({
      message: "Access denied"
    });
  } catch (error) {
    console.error("Get patient consultations error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  createConsultation,
  getPatientConsultations
};
