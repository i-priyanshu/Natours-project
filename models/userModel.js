const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have a name'],
  },

  email: {
    type: String,
    required: [true, 'Please Enter your E-mail!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide your valid E-mail!'],
  },

  photo: String,

  password: {
    type: String,
    required: [true, 'Please Provide a Password!'],
    minlength: 8,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your Password!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
