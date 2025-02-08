import jwt from 'jsonwebtoken';
import User from '../src/backend/models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('Authorization header is missing');
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      console.log('User not found or token invalid');
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log('Authentication error:', error);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default authMiddleware;