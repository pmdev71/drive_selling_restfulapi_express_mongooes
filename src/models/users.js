const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// create user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
    },
    password: {
      type: String,
      min: 5,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      default: 100,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hasing password using bcrypt
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//generating jwt token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    // console.log(token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

// create new collection
const User = new mongoose.model('User', userSchema);

module.exports = User;
