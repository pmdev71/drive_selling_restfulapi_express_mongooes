const mongoose = require('mongoose');
const validator = require('validator');

const pacageSchima = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  operator: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});

const Package = new mongoose.model('Package', pacageSchima);

module.exports = Package;
