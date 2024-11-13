const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, userType });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Controller function to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user.id comes from the token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: user.name,
      email: user.email,
      userType: user.userType // Include userType for role-specific functionality
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};