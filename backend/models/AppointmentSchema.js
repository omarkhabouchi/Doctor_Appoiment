const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
  },
  date: Date,
  reason: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
