const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      departmentId,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    if (
      !doctorId ||
      !departmentId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        message: "Required appointment details are missing",
      });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      departmentId,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Book appointment error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    })
      .populate("doctorId")
      .populate("departmentId")
      .sort({ appointmentDate: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
};
