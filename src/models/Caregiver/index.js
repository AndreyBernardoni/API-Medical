const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    unique: [true, "User already exists"],
  },
  elderly: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Elderly",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Caregiver = mongoose.model("Caregiver", caregiverSchema);

module.exports = Caregiver;
