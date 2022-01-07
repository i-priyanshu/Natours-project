const crypto = require('crypto');
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

  role: {
    type: String,
    enum: ['user', 'guide', 'tour-guide', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'Please Provide a Password!'],
    minlength: 8,
    select: false,
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

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
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

// :IMP: Instance Method.
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
