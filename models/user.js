// IMPORT MONGOOSE
const mongoose = require('mongoose');

// DEFINE SCHEMA
const userSchema = mongoose.Schema({
  name: String,
  balance: Number,
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
