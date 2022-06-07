const mongoose = require('mongoose');
const validator = require('validator');

// create user schima
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already regidstired !'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email !');
      }
    },
  },
  phone: {
    type: Number,
    min: 11,
    required: true,
    unique: true,
  },
});

// create new collection
const User = new mongoose.model('User', userSchema);

module.exports = User;
