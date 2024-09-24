const express = require('express');
const { createRequest, getRequests } = require('../controllers/requestController'); // Correct path to the controller
const { verifyToken } = require('../middleware/authMiddleware'); // Correct path to middleware

const router = express.Router();

// Create a new request (only for signed-in users)
router.post('/', verifyToken, createRequest); // ensure createRequest is not undefined

// Get all requests (for admin)
router.get('/', verifyToken, getRequests);

module.exports = router;
