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

    if (!appointmentId || !patientId || !checkedInBy) {
      return res.status(400).json({
        message: "Appointment ID, Patient ID and Receptionist ID are required"
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    if (appointment.patientId.toString() !== patientId) {
      return res.status(400).json({
        message: "Patient does not belong to this appointment"
      });
    }

    const existingCheckIn = await CheckIn.findOne({
      appointmentId,
      status: "checked-in"
    });

    if (existingCheckIn) {
      return res.status(400).json({
        message: "Patient is already checked in"
      });
    }

    const checkIn = await CheckIn.create({
      appointmentId,
      patientId,
      checkedInBy,
      method: method || "reception"
    });

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


// Get today's appointments
const getTodayAppointments = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: {
        $nin: ["cancelled"]
      }
    })
      .populate("patientId", "name email phone")
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name"
        }
      })
      .populate("departmentId")
      .sort({ appointmentTime: 1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get today's appointments",
      error: error.message
    });
  }
};


module.exports = {
  checkInPatient,
  getCheckIn,
  getTodayAppointments
};