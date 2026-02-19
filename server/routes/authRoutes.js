const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public routes (no authentication required)
router.post("/request-otp", authController.requestOtp);
router.post("/verify-otp", authController.verifyOtp);

// Protected routes (require valid JWT token)
router.get("/me", protect, authController.getMe);
router.get("/subscription-status", protect, authController.checkSubscription);

module.exports = router;