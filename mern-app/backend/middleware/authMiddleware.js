const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from the Authorization header
      const decoded = jwt.verify(token, 'secret'); // Verify the token using the secret key
      req.user = await User.findById(decoded.id).select('-password'); // Attach the user to the request
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' }); // Token is invalid
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' }); // No token provided
  }
};

module.exports = { protect };


