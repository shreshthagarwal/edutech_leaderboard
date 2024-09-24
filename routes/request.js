const express = require("express");
const Request = require("../models/Request");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Middleware to verify token
router.use(verifyToken);

// Create a new point request
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request({
      userId: req.user.id,
      heading: req.body.heading,
      description: req.body.description,
      imageURL: req.body.imageURL,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all requests (for admin)
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Approve a request
router.put("/:id/approve", async (req, res) => {
  try {
    const { points } = req.body; // Points assigned by admin
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "approved", pointsAssigned: points },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
