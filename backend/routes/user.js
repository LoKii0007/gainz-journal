const express = require('express');
const { updateUser } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.put('/me', updateUser);

module.exports = router; 