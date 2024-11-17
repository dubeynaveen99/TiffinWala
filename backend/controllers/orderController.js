const Order = require('../models/Order');
const User = require('../models/User');

// Fetch order history based on user role
exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from the authentication middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let orders;

    // Role-based filtering
    if (user.userType === 'manager') {
      // Manager: Fetch all orders
      orders = await Order.find().populate('customerId', 'name email');
    } else if (user.userType === 'customer') {
      // Customer: Fetch only their own orders
      orders = await Order.find({ customerId: userId }).populate('customerId', 'name email');
    } else if (user.userType === 'provider') {
      // Provider: Fetch orders for their outlet
      orders = await Order.find({ outlet: user.name }).populate('customerId', 'name email');
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
