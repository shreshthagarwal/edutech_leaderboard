const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users and their points
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
