// Importing the User model to interact with the database
import User from '../models/User.js';
// Importing utility functions for user validation, email checks, password verification, and transaction recording
import { validateUserId, checkEmailExists, verifyPassword, recordTransaction } from '../utils.js';

// This function will create a new user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Extracting user details from the request body

  try {
    // Check if the user has admin privileges
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create new users.' }); // Respond with access denied
    }

    // Check if the email already exists
    await checkEmailExists(email);

    // Create a new User instance with the provided data
    const user = new User({ name, email, password, role });
    // Save the user to the database
    await user.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'create', null, { name, email, role });

    console.log('User created successfully:', user);
    res.status(201).json({ message: 'User created successfully!' }); // Respond with success
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message }); // Respond with error
  }
};

// This function will get all users
export const getUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});
    console.log('Users retrieved successfully:', users);
    res.status(200).json(users); // Respond with the retrieved users
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters

  try {
    // Validate the user ID and retrieve the user
    const user = await validateUserId(id);
    console.log('User retrieved successfully:', user);
    res.status(200).json(user); // Respond with the retrieved user
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will update a user
export const updateUser = async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters
  const { name, email, password } = req.body; // Extracting updated user details from the request body

  try {
    // Validate the user ID and retrieve the user
    const user = await validateUserId(id);

    // Check if the user is updating their own profile or if they have admin privileges
    if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You can only update your own profile.' }); // Respond with access denied
    }

    // Check if the email is being updated and if it already exists
    if (email && email !== user.email) {
      await checkEmailExists(email);
      user.email = email;
    }

    // Store the old details for transaction recording
    const oldDetails = { name: user.name, email: user.email, role: user.role };
    // Update the user with the new data
    user.name = name || user.name;
    if (password) {
      user.password = password;
    }

    // Save the updated user to the database
    await user.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'update', null, { old: oldDetails, new: { name: user.name, email: user.email, role: user.role } });

    console.log('User updated successfully:', user);
    res.status(200).json({ message: 'User updated successfully!' }); // Respond with success
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters
  const { password } = req.body; // Extracting the password from the request body

  try {
    // Validate the user ID and retrieve the user
    const user = await validateUserId(id);

    // Check if the user is deleting their own profile or if they have admin privileges
    if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You can only delete your own profile.' }); // Respond with access denied
    }

    // Verify the provided password with the stored password
    await verifyPassword(password, req.user.password);

    // Delete the user from the database
    await User.findByIdAndDelete(id);

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', null, { name: user.name, email: user.email, role: user.role });

    console.log('User deleted successfully:', user);
    res.status(200).json({ message: 'User deleted successfully!' }); // Respond with success
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};