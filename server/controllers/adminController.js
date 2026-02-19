// controllers/adminController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Create a new user (Admin only)
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  try {
    console.log("📝 Create user - Body:", req.body);
    
    const { 
      phone, 
      fullName, 
      email, 
      age, 
      gender, 
      subscriptionType,
      status = 'Active',
      productNumber 
    } = req.body;

    // Validate required fields
    if (!phone || !fullName) {
      return res.status(400).json({ 
        success: false,
        message: "Phone and full name are required" 
      });
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 9) {
      return res.status(400).json({ 
        success: false,
        message: "Please enter a valid 9-digit phone number" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { 
        phone: cleanPhone 
      } 
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User with this phone number already exists" 
      });
    }

    // Create new user
    const user = await User.create({
      phone: cleanPhone,
      fullName,
      email: email || null,
      age: age || null,
      gender: gender || null,
      status,
      subscriptionType: subscriptionType || 'Trial',
      productNumber: productNumber || null,
      registrationDate: new Date(),
      point: 0
    });

    console.log("✅ User created successfully:", user.id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        subscriptionType: user.subscriptionType,
        registrationDate: user.registrationDate
      }
    });

  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again." 
    });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['lastOtp', 'otpSentTime', 'password'] },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Get user by phone (Admin only)
// @route   GET /api/admin/users/:phone
// @access  Private/Admin
exports.getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const cleanPhone = phone.replace(/\D/g, '');

    const user = await User.findOne({ 
      where: { phone: cleanPhone },
      attributes: { exclude: ['lastOtp', 'otpSentTime', 'password'] }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Remove fields that shouldn't be updated directly
    delete updates.id;
    delete updates.lastOtp;
    delete updates.otpSentTime;
    delete updates.password;

    await user.update(updates);

    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        subscriptionType: user.subscriptionType
      }
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};