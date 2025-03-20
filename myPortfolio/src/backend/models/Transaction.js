import mongoose from 'mongoose';

// Define the schema for the Transaction
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // User ID is required
  },
  userName: {
    type: String,
    required: true, // User name is required
  },
  userRole: {
    type: String,
    enum: ['user', 'admin'],
    required: true, // User role is required and must be either 'user' or 'admin'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true, // Date is required and defaults to the current date
  },
  action: {
    type: String,
    required: true, // Action performed is required
  },
  session: {
    type: String,
    required: false, // Session is optional
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true, // Details of the transaction are required
  }
});

// Create the Transaction model using the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;