const jwt = require('jsonwebtoken');
const User = require('../models/User');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    // Use the same JWT_SECRET for signing the token
    const token = generateToken(user._id);
    console.log('Token generated with secret:', process.env.JWT_SECRET);  // Debugging log
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { registerUser, loginUser };
