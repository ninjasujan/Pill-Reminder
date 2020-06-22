const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
    required: true,
  },
  medicine: [
    {
      name: String,
      schedule: { morning: Boolean, afternoon: Boolean, night: Boolean },
      days: Number,
    },
  ],
});

module.exports = mongoose.model("Patients", PatientSchema);
