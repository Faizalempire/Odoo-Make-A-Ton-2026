
const mongoose = require("mongoose");

const quotationItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },

  description: {
    type: String,
    trim: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  taxRate: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const quotationSchema = new mongoose.Schema(
  {
    quotationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    items: {
      type: [quotationItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "A quotation must contain at least one product",
      },
    },

    validUntil: {
      type: Date,
      required: true,
    },

    paymentTerms: {
      type: String,
      default: "Due on receipt",
    },

    status: {
      type: String,
      enum: ["draft", "sent", "accepted", "rejected", "expired"],
      default: "draft",
    },

    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;
