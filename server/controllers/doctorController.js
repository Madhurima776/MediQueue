const Doctor = require("../models/Doctor");

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email")
      .populate("departmentId", "name");

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("userId", "name email")
      .populate("departmentId", "name");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Get doctor error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
};
