const express = require('express');
const { getOrderHistory } = require('../controllers/orderController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Route to get order history
router.get('/history', authenticateToken, getOrderHistory);

module.exports = router;
