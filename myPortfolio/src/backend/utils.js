/* eslint-disable no-undef */
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Transaction from './models/Transaction.js';

// Função para validar o ID do usuário
export const validateUserId = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Função para verificar se o email já existe
export const checkEmailExists = async (email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }
};

// Função para gerar um token JWT
export const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Função para verificar a senha
export const verifyPassword = async (inputPassword, userPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, userPassword);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
};

// Função para registrar uma transação
export const recordTransaction = async (user, action, entity, details) => {
  try {
    const transaction = new Transaction({
      user: user._id,
      userName: user.name,
      userRole: user.role,
      action,
      entity,
      details
    });
    await transaction.save();
    console.log('Transaction recorded successfully:', transaction);
  } catch (error) {
    console.error('Error recording transaction:', error);
  }
};