const express = require('express');
const router = new express.Router();
const Order = require('../models/orders');

// post/create new order
router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    const createOrder = await order.save();
    res.status(200).send(createOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all orders
router.get('/orders', async (req, res) => {
  try {
    const ordersData = await Order.find();
    res.status(200).send(ordersData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
