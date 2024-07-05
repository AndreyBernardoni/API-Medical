const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  elderly_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Elderly",
    required: [true, "Elderly is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  dosage: {
    type: String,
    required: [true, "Dosage is required"],
  },
  frequency: {
    type: Number,
    required: [true, "Frequency is required"],
  },
  time: {
    type: Date,
    required: [true, "Time is required"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Medication = mongoose.model("Medication", medicationSchema);

module.exports = Medication;
