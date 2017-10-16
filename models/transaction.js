// IMPORT MONGOOSE
const mongoose = require('mongoose');

// DEFINE SCHEMA
const transactionSchema = mongoose.Schema({
  from: String,
  to: String,
  description: String,
  amount: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
