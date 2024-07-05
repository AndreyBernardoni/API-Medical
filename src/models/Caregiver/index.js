const mongoose = require("mongoose");

// {
//     "_id": ObjectId,
//     "user_id": ObjectId, // reference to the users collection
//     "elderly": [ObjectId], // references to the elderly collection
//     "created_at": Date,
//     "updated_at": Date
//   }

const caregiverSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
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
