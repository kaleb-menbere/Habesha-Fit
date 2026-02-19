const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// Generate 4-digit OTP (easier for users)
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// controllers/authController.js

// @desc    Request OTP - ONLY for existing users
// @route   POST /api/auth/request-otp
// @access  Public
exports.requestOtp = async (req, res) => {
  try {
    console.log("📥 Request OTP - Body:", req.body);
    
    const { phone } = req.body;

    // Validate phone number
    if (!phone) {
      console.log("❌ Phone number missing");
      return res.status(400).json({ 
        success: false,
        message: "Phone number is required" 
      });
    }

    // Clean phone number (remove non-digits)
    const cleanPhone = phone.replace(/\D/g, '');
    console.log("📞 Clean phone:", cleanPhone);

    // Validate Ethiopian phone number (9 digits)
    if (cleanPhone.length !== 9) {
      console.log("❌ Invalid phone length:", cleanPhone.length);
      return res.status(400).json({ 
        success: false,
        message: "Please enter a valid 9-digit phone number" 
      });
    }

    // Check if user exists in database
    const user = await User.findOne({ where: { phone: cleanPhone } });

    if (!user) {
      console.log("❌ No user found with phone:", cleanPhone);
      return res.status(404).json({ 
        success: false,
        message: "This phone number is not registered. Please contact support to register." 
      });
    }

    console.log("👤 Existing user found:", user.id, user.fullName);

    // Check if user is active
    if (user.status !== 'Active') {
      console.log("❌ User not active. Status:", user.status);
      return res.status(403).json({ 
        success: false,
        message: "Your account is not active. Please contact support." 
      });
    }

    // Generate 4-digit OTP
    const otp = generateOTP();
    console.log("🔐 Generated OTP:", otp);

    // Update existing user with new OTP
    user.lastOtp = otp;
    user.otpSentTime = new Date();
    await user.save();
    console.log("✅ OTP updated for user");

    // TODO: Send SMS via your provider
    // Example: await sendSMS(cleanPhone, `Your Habesha Fit OTP is: ${otp}`);

    // Return success response
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      // Only return OTP in development for testing
      ...(process.env.NODE_ENV === 'development' && { 
        otp,
        debug: true,
        note: "Remove in production"
      })
    });

  } catch (error) {
    console.error("❌ Error in requestOtp:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again."
    });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
  try {
    console.log("🔐 Verify OTP - Body:", req.body);
    
    const { phone, otp } = req.body;

    // Validate inputs
    if (!phone || !otp) {
      console.log("❌ Missing phone or OTP");
      return res.status(400).json({ 
        success: false,
        message: "Phone and OTP are required" 
      });
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, '');
    console.log("📞 Clean phone:", cleanPhone);

    // Find user
    const user = await User.findOne({ where: { phone: cleanPhone } });

    if (!user) {
      console.log("❌ User not found for phone:", cleanPhone);
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    console.log("👤 User found:", user.id, user.fullName);
    console.log("📅 OTP sent time:", user.otpSentTime);
    console.log("🔐 Stored OTP:", user.lastOtp);
    console.log("🔐 Received OTP:", otp);

    // Check if OTP exists
    if (!user.lastOtp) {
      console.log("❌ No OTP found for user");
      return res.status(400).json({ 
        success: false,
        message: "No OTP request found. Please request a new OTP." 
      });
    }

    // Check OTP expiry (5 minutes)
    const now = new Date();
    const otpTime = new Date(user.otpSentTime);
    const diffMinutes = (now - otpTime) / (1000 * 60);
    
    console.log("⏱️ Time difference (minutes):", diffMinutes);

    if (diffMinutes > 5) {
      console.log("❌ OTP expired after", diffMinutes, "minutes");
      // Clear expired OTP
      user.lastOtp = null;
      await user.save();
      
      return res.status(400).json({ 
        success: false,
        message: "OTP has expired. Please request a new one." 
      });
    }

    // Verify OTP
    if (user.lastOtp !== otp) {
      console.log("❌ OTP mismatch. Expected:", user.lastOtp, "Received:", otp);
      return res.status(400).json({ 
        success: false,
        message: "Invalid OTP" 
      });
    }

    console.log("✅ OTP verified successfully");

    // Check if user is active
    if (user.status !== 'Active') {
      console.log("❌ User not active. Status:", user.status);
      return res.status(403).json({ 
        success: false,
        message: "Your account is not active. Please contact support." 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    console.log("🎫 JWT Token generated");

    // Clear OTP after successful verification
    user.lastOtp = null;
    user.lastLoginAt = new Date();
    await user.save();
    console.log("✅ OTP cleared and login time updated");

    // Prepare user data (exclude sensitive info)
    const userData = {
      id: user.id,
      phone: user.phone,
      fullName: user.fullName,
      email: user.email,
      status: user.status,
      subscriptionType: user.subscriptionType,
      point: user.point || 0,
      registrationDate: user.registrationDate
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData
    });

  } catch (error) {
    console.error("❌ Error in verifyOtp:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    console.log("👤 Getting profile for user:", req.user.id);
    
    // req.user is attached by protect middleware
    const user = req.user;
    
    res.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        status: user.status,
        subscriptionType: user.subscriptionType,
        point: user.point,
        registrationDate: user.registrationDate,
        nextRenewalTime: user.nextRenewalTime,
        productNumber: user.productNumber
      }
    });
  } catch (error) {
    console.error("❌ Error in getMe:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Check subscription status
// @route   GET /api/auth/subscription-status
// @access  Private
exports.checkSubscription = async (req, res) => {
  try {
    const user = req.user;
    
    const isActive = user.status === 'Active' && 
      (!user.nextRenewalTime || new Date(user.nextRenewalTime) > new Date());

    // Calculate days remaining until renewal
    let daysRemaining = null;
    if (user.nextRenewalTime) {
      const now = new Date();
      const renewal = new Date(user.nextRenewalTime);
      daysRemaining = Math.ceil((renewal - now) / (1000 * 60 * 60 * 24));
    }

    // Check if trial is expiring soon
    const isTrial = user.subscriptionType?.toLowerCase() === 'trial';
    const trialEndingSoon = isTrial && daysRemaining !== null && daysRemaining <= 3 && daysRemaining > 0;

    res.json({
      success: true,
      subscription: {
        type: user.subscriptionType || 'None',
        status: user.status,
        nextRenewal: user.nextRenewalTime,
        isActive,
        daysRemaining,
        isTrial,
        trialEndingSoon,
        points: user.point || 0
      }
    });
  } catch (error) {
    console.error("❌ Error in checkSubscription:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};