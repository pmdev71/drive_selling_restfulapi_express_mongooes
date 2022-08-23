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
      // min: 11,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      // min: 5,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      default: 100,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // messages: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     email: {
    //       type: String,
    //       required: true,
    //     },
    //     phone: {
    //       type: Number,
    //       required: true,
    //     },
    //     message: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
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

//store the message
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (err) {
    console.log(err);
  }
};

// create new collection
const User = new mongoose.model('User', userSchema);

module.exports = User;
