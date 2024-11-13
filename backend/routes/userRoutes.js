const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Route to get current user's profile
router.get('/me', authenticateToken, getUserProfile);

module.exports = router;
