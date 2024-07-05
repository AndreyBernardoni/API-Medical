const mongoose = require("mongoose");

const elderlySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  pair_code: {
    type: String,
    required: [true, "Pair code is required"],
  },
  medications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
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

const Elderly = mongoose.model("Elderly", elderlySchema);

module.exports = Elderly;
