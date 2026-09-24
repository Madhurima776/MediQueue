const mongoose = require("mongoose");

const queueTokenSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true
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

    tokenNumber: {
      type: Number,
      required: true
    },

    queueDate: {
      type: String,
      required: true
    },

    priority: {
      type: String,
      enum: ["NORMAL", "EMERGENCY"],
      default: "NORMAL"
    },

    status: {
      type: String,
      enum: [
        "WAITING",
        "CALLED",
        "IN_CONSULTATION",
        "COMPLETED",
        "SKIPPED"
      ],
      default: "WAITING"
    },

    calledAt: {
      type: Date
    },

    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const QueueToken = mongoose.model(
  "QueueToken",
  queueTokenSchema
);

module.exports = QueueToken;