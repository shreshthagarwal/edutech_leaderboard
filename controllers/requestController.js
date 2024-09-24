// requestController.js
const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  const { heading, description, imageURL } = req.body;
  const userId = req.user.id;

  try {
    const newRequest = new Request({
      userId,
      heading,
      description,
      imageURL,
      status: 'pending',
      pointsAssigned: 0,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRequest = async (req, res) => {
  const { id } = req.params;
  const { pointsAssigned, status } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { pointsAssigned, status },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
