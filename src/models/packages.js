const mongoose = require('mongoose');
const validator = require('validator');

const pacageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regulaPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
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
    operatorImageThumb: {
      type: String,
      required: true,
    },
    operatorImageBanner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = new mongoose.model('Package', pacageSchema);

module.exports = Package;
