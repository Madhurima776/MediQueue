const express = require("express");

const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getUsers,
  updateUser,
  deleteUser,

} = require("../controllers/adminController");

const router = express.Router();

// Department routes
router.post("/departments", createDepartment);
router.get("/departments", getDepartments);
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
module.exports = router;