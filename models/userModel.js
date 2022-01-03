const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    validate: {
      // This only works on CREATE and SAVE!!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run when password is actually changed!
  if (!this.isModified('password')) return next();

  // Hash the password at the cost of 12.
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm Field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
