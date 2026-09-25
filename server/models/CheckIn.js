const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    checkedInBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    checkInTime: {
      type: Date,
      default: Date.now
    },

    method: {
      type: String,
      enum: ["reception", "QR"],
      default: "reception"
    },

    status: {
      type: String,
      enum: ["checked-in", "cancelled"],
      default: "checked-in"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CheckIn", checkInSchema);
