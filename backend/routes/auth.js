const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/user', protect, getUser);

module.exports = router; 