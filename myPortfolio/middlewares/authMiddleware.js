// Importing the jwt library for token verification
import jwt from 'jsonwebtoken';
// Importing the User model to fetch user data from the database
import User from '../src/backend/models/User.js';

// Middleware to authenticate requests using JWT
const authMiddleware = async (req, res, next) => {
  // Extracting the Authorization header from the request
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    // If the Authorization header is missing, return a 401 Unauthorized response
    console.log('Authorization header is missing');
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  // Removing the "Bearer " prefix from the token
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verifying the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Finding the user in the database using the decoded userId and token
    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      // If the user is not found or the token is invalid, throw an error
      console.log('User not found or token invalid');
      throw new Error();
    }

    // Checking if the token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      // If the token is expired, return a 401 Unauthorized response
      console.log('Token expired');
      return res.status(401).json({ error: 'Token expired' });
    }

    // Attaching the user and token to the request object for further use
    req.user = user;
    req.token = token;
    // Proceeding to the next middleware or route handler
    next();
  } catch (error) {
    // Handling authentication errors and returning a 401 Unauthorized response
    console.log('Authentication error:', error);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Exporting the middleware for use in other parts of the application
export default authMiddleware;