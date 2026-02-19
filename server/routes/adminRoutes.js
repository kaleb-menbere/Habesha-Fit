const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/auth");

// All admin routes require authentication and admin privileges
router.use(protect);
router.use(adminOnly);

// User management routes
router.post("/users", adminController.createUser);
router.get("/users", adminController.getAllUsers);
router.get("/users/stats/summary", adminController.getUserStats); // Make sure this line exists
router.get("/users/:id", adminController.getUserById);
router.get("/users/phone/:phone", adminController.getUserByPhone);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

// Bulk operations
router.post("/users/bulk", adminController.bulkCreateUsers);

module.exports = router;