const QueueToken = require("../models/QueueToken");
const Appointment = require("../models/Appointment");


// Generate queue token
const generateQueueToken = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        message: "Appointment ID is required"
      });
    }

    const appointment = await Appointment.findById(
      appointmentId
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    if (appointment.status !== "CHECKED_IN") {
      return res.status(400).json({
        message:
          "Patient must be checked in before getting a queue token"
      });
    }

    // Check if token already exists
    const existingToken = await QueueToken.findOne({
      appointment: appointmentId
    });

    if (existingToken) {
      return res.status(400).json({
        message: "Queue token already exists",
        queueToken: existingToken
      });
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    // Find last token for this doctor today
    const lastToken = await QueueToken.findOne({
      doctor: appointment.doctor,
      queueDate: today
    }).sort({ tokenNumber: -1 });

    const tokenNumber = lastToken
      ? lastToken.tokenNumber + 1
      : 1;

    const queueToken = await QueueToken.create({
      appointment: appointment._id,
      patient: appointment.patient,
      doctor: appointment.doctor,
      tokenNumber,
      queueDate: today
    });

    appointment.status = "WAITING";
    await appointment.save();

    const result = await QueueToken.findById(
      queueToken._id
    )
      .populate("patient", "name phone")
      .populate("doctor")
      .populate("appointment");

    res.status(201).json({
      message: "Queue token generated successfully",
      queueToken: result
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get doctor's current queue
const getDoctorQueue = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const queue = await QueueToken.find({
      doctor: req.params.doctorId,
      queueDate: today,
      status: {
        $in: [
          "WAITING",
          "CALLED",
          "IN_CONSULTATION"
        ]
      }
    })
      .populate("patient", "name phone")
      .sort({ tokenNumber: 1 });

    res.status(200).json({
      queue
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Call next patient
const callNextPatient = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const nextPatient = await QueueToken.findOne({
      doctor: doctorId,
      queueDate: new Date()
        .toISOString()
        .split("T")[0],
      status: "WAITING"
    })
      .sort({ priority: -1, tokenNumber: 1 });

    if (!nextPatient) {
      return res.status(404).json({
        message: "No waiting patients"
      });
    }

    nextPatient.status = "CALLED";
    nextPatient.calledAt = new Date();

    await nextPatient.save();

    res.status(200).json({
      message: "Patient called successfully",
      queueToken: nextPatient
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Start consultation
const startConsultation = async (req, res) => {
  try {
    const queueToken = await QueueToken.findById(
      req.params.id
    );

    if (!queueToken) {
      return res.status(404).json({
        message: "Queue token not found"
      });
    }

    queueToken.status = "IN_CONSULTATION";

    await queueToken.save();

    await Appointment.findByIdAndUpdate(
      queueToken.appointment,
      {
        status: "IN_CONSULTATION"
      }
    );

    res.status(200).json({
      message: "Consultation started",
      queueToken
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Complete queue token
const completeQueueToken = async (req, res) => {
  try {
    const queueToken = await QueueToken.findById(
      req.params.id
    );

    if (!queueToken) {
      return res.status(404).json({
        message: "Queue token not found"
      });
    }

    queueToken.status = "COMPLETED";
    queueToken.completedAt = new Date();

    await queueToken.save();

    await Appointment.findByIdAndUpdate(
      queueToken.appointment,
      {
        status: "COMPLETED"
      }
    );

    res.status(200).json({
      message: "Queue completed successfully",
      queueToken
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
  generateQueueToken,
  getDoctorQueue,
  callNextPatient,
  startConsultation,
  completeQueueToken
};