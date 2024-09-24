const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  heading: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  status: { type: String, default: "pending" }, // Add status field
  pointsAssigned: { type: Number, default: 0 }, // Add points field
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);
