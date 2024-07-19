const db = require('../config/db');

const createUser = (username, password, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], callback);
};

const findUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], callback);
};

module.exports = {
  createUser,
  findUserByUsername
};
