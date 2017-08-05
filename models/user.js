"use strict"

//IMPORT MONGOOSE
var mongoose = require('mongoose');

//DEFINE SCHEMA
var userSchema = mongoose.Schema({
  name: String,
  balance: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;
