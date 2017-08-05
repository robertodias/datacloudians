"use strict"

//IMPORT MONGOOSE
var mongoose = require('mongoose');

//DEFINE SCHEMA
var transactionSchema = mongoose.Schema({
  from: String,
  to: String,
  description: String,
  amount: Number
});

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
