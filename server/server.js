const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); 

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Habesha Fit API is running!' });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
      console.log(`📝 Test OTP: http://localhost:${PORT}/api/auth/request-otp`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to database:', err);
  });