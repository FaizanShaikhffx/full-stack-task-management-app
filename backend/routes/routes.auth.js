const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/model.user.js');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
