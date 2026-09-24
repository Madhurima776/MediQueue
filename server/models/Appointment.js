const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },

    appointmentDate: {
      type: Date,
      required: true
    },

    appointmentTime: {
      type: String,
      required: true
    },

    reason: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: [
        "BOOKED",
        "CHECKED_IN",
        "WAITING",
        "IN_CONSULTATION",
        "COMPLETED",
        "CANCELLED",
        "NO_SHOW",
        "SKIPPED"
      ],
      default: "BOOKED"
    },

    qrToken: {
      type: String,
      unique: true,
      required: true
    },

    checkedInAt: {
      type: Date
    },

    cancelledAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema
);

module.exports = Appointment;