const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Department = require("../models/Department");

const createDoctor = async (req, res) => {
  try {
    const {
      userId,
      specialization,
      departmentId,
      qualification,
      experience,
      consultationFee
    } = req.body;

    if (!userId || !specialization || !departmentId) {
      return res.status(400).json({
        message:
          "User ID, specialization and department are required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const department = await Department.findById(
      departmentId
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    const existingDoctor = await Doctor.findOne({
      user: userId
    });

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor profile already exists"
      });
    }

    const doctor = await Doctor.create({
      user: userId,
      specialization,
      department: departmentId,
      qualification,
      experience,
      consultationFee
    });

    const createdDoctor =
      await Doctor.findById(doctor._id)
        .populate("user", "name email phone")
        .populate("department", "name");

    res.status(201).json({
      message: "Doctor created successfully",
      doctor: createdDoctor
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name email phone")
      .populate("department", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      doctors
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("department", "name");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      doctor
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
  createDoctor,
  getDoctors,
  getDoctorById
};