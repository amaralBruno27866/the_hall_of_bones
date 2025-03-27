import User from '../models/User.js';
import { generateToken, verifyPassword } from '../utils.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    await verifyPassword(password, user.password);

    const token = generateToken(user);
    user.token = token;

    await user.save();
    console.log('User logged in successfully:', user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    console.log('User logged out successfully:', req.user);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: error.message });
  }
};