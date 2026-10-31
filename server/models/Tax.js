const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    taxCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      validate: {
        validator: Number.isFinite,
        message: "Tax rate must be a valid percentage",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

taxSchema.index({ isActive: 1 });

const Tax = mongoose.model("Tax", taxSchema);

module.exports = Tax;