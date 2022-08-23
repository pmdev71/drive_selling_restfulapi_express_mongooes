const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const User = require('../models/users');

// create new user/ Registration
router.post('/registration', async (req, res) => {
  try {
    const user = new User(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please, enter email and password.' });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: 'Invalid Credential password.' });
      } else {
        token = await userLogin.generateAuthToken();
        // console.log(token);
        //add token on cookies for 30 days
        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 2589200000),
          httpOnly: true,
        });
        res.status(200).json({ message: 'Successfully login' });
      }
    } else {
      res.status(400).json({ error: 'Invalid Credential' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// git all user
router.get('/users', async (req, res) => {
  try {
    // res.cookie('jwtTokenTest', 'testTokenValue');
    const usersData = await User.find();
    res.status(400).send(usersData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get single user by id
router.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const userData = await User.findById(_id);
    if (!userData) {
      return res.status(400).send();
    }
    res.send(userData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get single user by email
router.get('/users/:e_mail', async (req, res) => {
  try {
    const email = req.params.e_mail;
    const userData = await User.find({ email });
    if (!email) {
      return res.status(400).send();
    }
    res.send(userData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update user by id using patch
router.patch('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

//delete user by id
router.delete('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(_id);
    if (!deleteUser) {
      return res.status(400).send();
    }
    res.send(deleteUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// about us page
router.get('/about', authenticate, (req, res) => {
  res.send(req.rootUser);
});

// get user data for home and contact page
router.get('/userdata', authenticate, (req, res) => {
  res.send(req.rootUser);
});

// post new contact message
router.post('/contact', authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log('Contact form empty.');
      return res.json({ error: 'Please fill the contact form.' });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();
      res.status(201).json({ message: 'User contact success.' });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// app.post('/users', (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// app.post('/packages', (req, res) => {
//   const package = new Package(req.body);
//   package
//     .save()
//     .then(() => {
//       res.status(201).send(package);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });
