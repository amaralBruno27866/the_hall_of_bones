import Transaction from '../models/Transaction.js';

// This function will get all transactions
export const getTransactions = async (req, res) => {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find({});
    console.log('Transactions retrieved successfully:', transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will get a transaction by ID
export const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the transaction by ID
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    console.log('Transaction retrieved successfully:', transaction);
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    res.status(500).json({ error: error.message });
  }
};