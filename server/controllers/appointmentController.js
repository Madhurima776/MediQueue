const crypto = require("crypto");

const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Department = require("../models/Department");


// CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      departmentId,
      appointmentDate,
      appointmentTime,
      reason
    } = req.body;

    if (
      !doctorId ||
      !departmentId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        message:
          "Doctor, department, date and time are required"
      });
    }

    // Check doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    if (!doctor.available) {
      return res.status(400).json({
        message: "Doctor is currently unavailable"
      });
    }

    // Check department
    const department = await Department.findById(
      departmentId
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    // Generate unique QR token
    const qrToken = crypto.randomBytes(32).toString("hex");

    // Create appointment
    const appointment = await Appointment.create({
      patient: req.user.userId,
      doctor: doctorId,
      department: departmentId,
      appointmentDate,
      appointmentTime,
      reason,
      qrToken
    });

    const createdAppointment =
      await Appointment.findById(appointment._id)
        .populate("patient", "name email phone")
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "name email phone"
          }
        })
        .populate("department", "name");

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: createdAppointment
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// GET MY APPOINTMENTS
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.userId
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email phone"
        }
      })
      .populate("department", "name")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      appointments
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// GET SINGLE APPOINTMENT
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(
      req.params.id
    )
      .populate("patient", "name email phone")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email phone"
        }
      })
      .populate("department", "name");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      appointment
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    if (
      appointment.patient.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message: "You cannot cancel this appointment"
      });
    }

    if (appointment.status !== "BOOKED") {
      return res.status(400).json({
        message:
          "Only booked appointments can be cancelled"
      });
    }

    appointment.status = "CANCELLED";
    appointment.cancelledAt = new Date();

    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// CHECK-IN USING QR TOKEN
const checkInAppointment = async (req, res) => {
  try {
    const { qrToken } = req.body;

    if (!qrToken) {
      return res.status(400).json({
        message: "QR token is required"
      });
    }

    const appointment = await Appointment.findOne({
      qrToken
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Invalid QR code or appointment not found"
      });
    }

    if (appointment.status !== "BOOKED") {
      return res.status(400).json({
        message:
          `Appointment cannot be checked in. Current status: ${appointment.status}`
      });
    }

    appointment.status = "CHECKED_IN";
    appointment.checkedInAt = new Date();

    await appointment.save();

    const updatedAppointment =
      await Appointment.findById(appointment._id)
        .populate("patient", "name email phone")
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "name email phone"
          }
        })
        .populate("department", "name");

    res.status(200).json({
      message: "Patient checked in successfully",
      appointment: updatedAppointment
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
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  checkInAppointment
};