const express = require('express');
const router = new express.Router();
const Package = require('../models/packages');

//create new package
router.post('/packages', async (req, res) => {
  try {
    const package = new Package(req.body);
    const createPackage = await package.save();
    res.status(201).send(createPackage);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all package
router.get('/packages', async (req, res) => {
  try {
    const packagesData = await Package.find();
    res.status(400).send(packagesData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
