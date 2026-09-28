const Department = require("../models/Department");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({
      isActive: true
    });

    res.status(200).json(departments);
  } catch (error) {
    console.error("Get departments error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getDepartments
};
