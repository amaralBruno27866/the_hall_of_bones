import jwt from 'jsonwebtoken';
import User from '../src/backend/models/User.js';

// Authentication middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.header('Authorization');
  
  // Check if the authorization header is present
  if (!authHeader) {
    console.log('Authorization header is missing');
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  // Remove the 'Bearer ' prefix from the token
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database based on the decoded ID and token
    const user = await User.findOne({ _id: decoded.userId, token });

    // Check if the user is found and the token is valid
    if (!user) {
      console.log('User not found or token invalid');
      throw new Error();
    }

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      console.log('Token expired');
      return res.status(401).json({ error: 'Token expired' });
    }

    // Add the user and token to the request for later use
    req.user = user;
    req.token = token;
    
    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.log('Authentication error:', error);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default authMiddleware;