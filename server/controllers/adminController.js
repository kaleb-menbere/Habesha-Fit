const User = require("../models/User");
const { Op } = require("sequelize");
const { sequelize } = require("../config/database");

// @desc    Create a new user
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  try {
    console.log("📝 Admin: Creating new user - Body:", req.body);
    
    const { 
      phone, 
      fullName, 
      email, 
      age, 
      gender, 
      subscriptionType,
      status = 'Active',
      productNumber,
      point = 0
    } = req.body;

    // Validate required fields
    if (!phone || !fullName) {
      return res.status(400).json({ 
        success: false,
        message: "Phone number and full name are required" 
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
      point: point,
      registrationDate: new Date()
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
        age: user.age,
        gender: user.gender,
        status: user.status,
        subscriptionType: user.subscriptionType,
        productNumber: user.productNumber,
        point: user.point,
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

// @desc    Get all users with optional filters
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    console.log("📋 Admin: Fetching all users - Query:", req.query);
    
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      subscriptionType,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    // Build where clause for filtering
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (subscriptionType) {
      where.subscriptionType = subscriptionType;
    }
    
    if (search) {
      where[Op.or] = [
        { phone: { [Op.like]: `%${search}%` } },
        { fullName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Get users with pagination
    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { 
        exclude: ['password', 'lastOtp', 'otpSentTime', 'otpMethod'] 
      },
      limit: parseInt(limit),
      offset: offset,
      order: [[sortBy, sortOrder]]
    });

    console.log(`✅ Found ${count} users total, returning ${users.length}`);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      users: users.map(user => ({
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        status: user.status,
        subscriptionType: user.subscriptionType,
        productNumber: user.productNumber,
        point: user.point,
        registrationDate: user.registrationDate,
        nextRenewalTime: user.nextRenewalTime,
        lastLoginAt: user.lastLoginAt
      }))
    });

  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Get single user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🔍 Admin: Fetching user by ID:", id);

    const user = await User.findByPk(id, {
      attributes: { 
        exclude: ['password', 'lastOtp', 'otpSentTime', 'otpMethod'] 
      }
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

// @desc    Get user by phone number
// @route   GET /api/admin/users/phone/:phone
// @access  Private/Admin
exports.getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const cleanPhone = phone.replace(/\D/g, '');
    
    console.log("🔍 Admin: Fetching user by phone:", cleanPhone);

    const user = await User.findOne({ 
      where: { phone: cleanPhone },
      attributes: { 
        exclude: ['password', 'lastOtp', 'otpSentTime', 'otpMethod'] 
      }
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

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    console.log("📝 Admin: Updating user:", id);
    console.log("📝 Update data:", updates);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Remove fields that shouldn't be updated directly
    delete updates.id;
    delete updates.password;
    delete updates.lastOtp;
    delete updates.otpSentTime;
    delete updates.otpMethod;
    delete updates.createdAt;
    delete updates.registrationDate;

    // Handle phone number if provided
    if (updates.phone) {
      updates.phone = updates.phone.replace(/\D/g, '');
      
      // Check if phone number is already taken by another user
      if (updates.phone !== user.phone) {
        const existingUser = await User.findOne({ 
          where: { 
            phone: updates.phone,
            id: { [Op.ne]: id }
          } 
        });
        
        if (existingUser) {
          return res.status(400).json({ 
            success: false,
            message: "Phone number already in use by another user" 
          });
        }
      }
    }

    await user.update(updates);

    console.log("✅ User updated successfully");

    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        status: user.status,
        subscriptionType: user.subscriptionType,
        productNumber: user.productNumber,
        point: user.point
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

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🗑️ Admin: Deleting user:", id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Don't allow deleting yourself
    if (user.id === req.user.id) {
      return res.status(400).json({ 
        success: false,
        message: "You cannot delete your own account" 
      });
    }

    await user.destroy();

    console.log("✅ User deleted successfully");

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

// @desc    Bulk create users
// @route   POST /api/admin/users/bulk
// @access  Private/Admin
exports.bulkCreateUsers = async (req, res) => {
  try {
    const { users } = req.body;
    
    console.log("📦 Admin: Bulk creating users - Count:", users?.length);

    if (!users || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide an array of users" 
      });
    }

    const results = {
      successful: [],
      failed: []
    };

    for (const userData of users) {
      try {
        // Clean phone number
        const cleanPhone = userData.phone?.replace(/\D/g, '');
        
        if (!cleanPhone || cleanPhone.length !== 9) {
          results.failed.push({
            ...userData,
            error: "Invalid phone number"
          });
          continue;
        }

        // Check if user exists
        const existing = await User.findOne({ 
          where: { phone: cleanPhone } 
        });

        if (existing) {
          results.failed.push({
            ...userData,
            error: "User already exists"
          });
          continue;
        }

        // Create user
        const user = await User.create({
          phone: cleanPhone,
          fullName: userData.fullName,
          email: userData.email || null,
          age: userData.age || null,
          gender: userData.gender || null,
          status: userData.status || 'Active',
          subscriptionType: userData.subscriptionType || 'Trial',
          productNumber: userData.productNumber || null,
          point: userData.point || 0,
          registrationDate: new Date()
        });

        results.successful.push({
          id: user.id,
          phone: user.phone,
          fullName: user.fullName
        });

      } catch (error) {
        results.failed.push({
          ...userData,
          error: error.message
        });
      }
    }

    console.log(`✅ Bulk create complete: ${results.successful.length} success, ${results.failed.length} failed`);

    res.status(201).json({
      success: true,
      message: `Created ${results.successful.length} users, ${results.failed.length} failed`,
      results
    });

  } catch (error) {
    console.error("❌ Error in bulk create:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/admin/users/stats/summary
// @access  Private/Admin
exports.getUserStats = async (req, res) => {
  try {
    console.log("📊 Admin: Fetching user statistics");

    const totalUsers = await User.count();
    
    const activeUsers = await User.count({ 
      where: { status: 'Active' } 
    });
    
    const inactiveUsers = await User.count({ 
      where: { status: 'Inactive' } 
    });

    const subscriptionStats = await User.findAll({
      attributes: [
        'subscriptionType',
        [sequelize.fn('COUNT', sequelize.col('subscriptionType')), 'count']
      ],
      group: ['subscriptionType']
    });

    const recentUsers = await User.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        recentUsers,
        subscriptionBreakdown: subscriptionStats.reduce((acc, stat) => {
          acc[stat.subscriptionType || 'Unknown'] = parseInt(stat.get('count'));
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error("❌ Error fetching user stats:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};
