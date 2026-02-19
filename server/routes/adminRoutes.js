// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createUser,
  getAllUsers,
  getUserByPhone,
  updateUser,
  deleteUser
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// All admin routes are protected and require admin role
router.use(protect);
router.use(adminOnly);

// User management
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:phone', getUserByPhone);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;