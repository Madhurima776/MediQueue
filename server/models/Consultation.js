const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true
    },

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

    symptoms: {
      type: String,
      trim: true
    },

    diagnosis: {
      type: String,
      trim: true
    },

    prescription: {
      type: String,
      trim: true
    },

    notes: {
      type: String,
      trim: true
    },

    followUpDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Consultation = mongoose.model(
  "Consultation",
  consultationSchema
);

module.exports = Consultation;