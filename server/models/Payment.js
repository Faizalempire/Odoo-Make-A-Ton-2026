const mongoose = require("mongoose");

const isValidPaise = (value) => {
  return Number.isSafeInteger(value) && value > 0;
};

const paymentSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    amountPaise: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: isValidPaise,
        message: "Payment amount must be a positive whole number of paise",
      },
    },

    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "bank_transfer",
        "card",
        "upi",
        "cheque",
        "other",
      ],
      required: true,
    },

    transactionReference: {
      type: String,
      trim: true,
      default: null,
    },

    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ invoice: 1, paymentDate: -1 });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;