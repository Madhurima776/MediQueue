const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const appointment =
      await Appointment.create(req.body);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await Appointment.find({
        patientId: req.params.patientId,
      });

    res.status(200).json(
      appointments
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
};