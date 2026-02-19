// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password', 'lastOtp', 'otpSentTime'] }
      });
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user is admin
exports.adminOnly = (req, res, next) => {
  // You can define admin users by email, role field, or special phone numbers
  const adminPhones = ['911111111', '922222222']; // Add admin phone numbers here
  const adminEmails = ['admin@habeshaft.com']; // Add admin emails here
  
  if (adminPhones.includes(req.user.phone) || adminEmails.includes(req.user.email)) {
    next();
  } else {
    res.status(403).json({ 
      success: false,
      message: 'Access denied. Admin only.' 
    });
  }
};