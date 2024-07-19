const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const register = (req, res) => {
  const { username, password } = req.body;

  User.findUserByUsername(username, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    User.createUser(username, hashedPassword, (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  User.findUserByUsername(username, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

module.exports = {
  register,
  login
};
