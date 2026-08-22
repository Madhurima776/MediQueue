const express = require("express");

const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/adminController");

const router = express.Router();

// Department routes
router.post("/departments", createDepartment);
router.get("/departments", getDepartments);
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

module.exports = router;