import User from '../models/User.js';
import { generateToken, verifyPassword } from '../utils.js';

// This function handles user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the provided password with the stored password
    await verifyPassword(password, user.password);

    // Generate a JWT token for the user
    const token = generateToken(user);
    user.token = token;

    // Save the user with the new token
    await user.save();
    console.log('User logged in successfully:', user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: error.message });
  }
};

// This function handles user logout
export const logout = async (req, res) => {
  try {
    // Set the user's token to null
    req.user.token = null;
    // Save the user with the null token
    await req.user.save();
    console.log('User logged out successfully:', req.user);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: error.message });
  }
};