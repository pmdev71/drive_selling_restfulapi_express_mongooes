const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDiscountPrice: {
      type: Number,
      required: true,
    },
    productRegularPrice: {
      type: Number,
      required: true,
    },
    productLocation: {
      type: String,
      required: true,
    },
    productValidity: {
      type: String,
      required: true,
    },
    productOperator: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    receverPhone: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;
