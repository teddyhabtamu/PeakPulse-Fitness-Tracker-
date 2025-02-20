// controllers/userController.js

const userModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) {
      console.error("Error querying users:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getAllUsers,
};
