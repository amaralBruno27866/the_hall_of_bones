import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: false,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;