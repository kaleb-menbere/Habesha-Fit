const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  
  // Add phone field - THIS IS MISSING!
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [9, 9],
      is: /^[0-9]+$/
    }
  },
  
  // Authentication fields
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  // Personal Information
  fullName: {
    type: DataTypes.STRING,
    field: 'first_and_last_name',
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER
  },
  gender: {
    type: DataTypes.STRING
  },
  
  // Registration Information
  registrationDate: {
    type: DataTypes.DATE,
    field: 'registration_date',
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Suspended', 'Expired'),
    defaultValue: 'Active'
  },
  
  // Subscription Information
  subscriptionType: {
    type: DataTypes.STRING,
    field: 'subscription_type'
  },
  nextRenewalTime: {
    type: DataTypes.DATE,
    field: 'next_renewal_time'
  },
  deactivationDate: {
    type: DataTypes.DATE,
    field: 'deactivation_date'
  },
  
  // OTP Information
  lastOtp: {
    type: DataTypes.STRING,
    field: 'last_otp'
  },
  otpSentTime: {
    type: DataTypes.DATE,
    field: 'otp_sent_time'
  },
  otpMethod: {
    type: DataTypes.STRING,
    field: 'otp_method'
  },
  
  // Product & Points
  productNumber: {
    type: DataTypes.STRING,
    field: 'product_number'
  },
  point: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastPointAdded: {
    type: DataTypes.DATE,
    field: 'last_point_added'
  },
  
  // Login tracking
  lastLoginAt: {
    type: DataTypes.DATE,
    field: 'last_login_at'
  },
  
  // Timestamps
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password && !user.password.startsWith('$2a$')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance method to check password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;