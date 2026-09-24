const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Department name is required"
      });
    }

    const existingDepartment = await Department.findOne({
      name
    });

    if (existingDepartment) {
      return res.status(400).json({
        message: "Department already exists"
      });
    }

    const department = await Department.create({
      name,
      description
    });

    res.status(201).json({
      message: "Department created successfully",
      department
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .sort({ name: 1 });

    res.status(200).json({
      departments
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
  createDepartment,
  getDepartments
};