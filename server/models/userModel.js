// models/userModel.js

const db = require("../config/dbConfig");

const getAllUsers = (callback) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllUsers,
};
