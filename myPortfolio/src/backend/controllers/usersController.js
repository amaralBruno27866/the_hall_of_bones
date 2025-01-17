import User from '../models/User.js';
import { validateUserId, checkEmailExists, verifyPassword, recordTransaction } from '../utils.js';

// This function will create a new user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create new users.' });
    }

    await checkEmailExists(email);

    const user = new User({ name, email, password, role });
    await user.save();

    await recordTransaction(req.user, 'create', null, { name, email, role });

    console.log('User created successfully:', user);
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
};

// This function will get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log('Users retrieved successfully:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await validateUserId(id);
    console.log('User retrieved successfully:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await validateUserId(id);

    if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You can only update your own profile.' });
    }

    if (email && email !== user.email) {
      await checkEmailExists(email);
      user.email = email;
    }

    const oldDetails = { name: user.name, email: user.email, role: user.role };
    user.name = name || user.name;
    if (password) {
      user.password = password;
    }

    await user.save();

    await recordTransaction(req.user, 'update', null, { old: oldDetails, new: { name: user.name, email: user.email, role: user.role } });

    console.log('User updated successfully:', user);
    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await validateUserId(id);

    if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You can only delete your own profile.' });
    }

    await verifyPassword(password, req.user.password);

    await User.findByIdAndDelete(id);

    await recordTransaction(req.user, 'delete', null, { name: user.name, email: user.email, role: user.role });

    console.log('User deleted successfully:', user);
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
};