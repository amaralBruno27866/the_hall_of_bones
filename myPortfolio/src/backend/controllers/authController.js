// Importing the User model to interact with the database
import User from '../models/User.js';
// Importing utility functions for token generation and password verification
import { generateToken, verifyPassword } from '../utils.js';

// Controller function to handle user login
export const login = async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from the request body

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      // If the user is not found, respond with a 404 status
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the provided password against the stored hashed password
    await verifyPassword(password, user.password);

    // Generate a new token for the user
    const token = generateToken(user);
    user.token = token; // Assign the token to the user

    // Save the updated user data to the database
    await user.save();
    console.log('User logged in successfully:', user);
    res.status(200).json({ token }); // Respond with the generated token
  } catch (error) {
    // Handle errors during login
    console.error('Error logging in:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function to handle user logout
export const logout = async (req, res) => {
  try {
    // Set the user's token to null to invalidate it
    req.user.token = null;
    // Save the updated user data to the database
    await req.user.save();
    console.log('User logged out successfully:', req.user);
    res.status(200).json({ message: 'Logged out successfully' }); // Respond with a success message
  } catch (error) {
    // Handle errors during logout
    console.error('Error logging out:', error);
    res.status(500).json({ message: error.message });
  }
};