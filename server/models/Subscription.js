
const mongoose = require("mongoose");

const subscriptionItemSchema = new mongoose.Schema({
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

const subscriptionSchema = new mongoose.Schema(
  {
    subscriptionNumber: {
      type: String,
      unique: true,
      required: true,
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
      type: [subscriptionItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "A subscription must contain at least one product",
      },
    },

    startDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    nextBillingDate: {
      type: Date,
      default: null,
    },

    paymentTerms: {
      type: String,
      default: "Due on receipt",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "quotation",
        "confirmed",
        "active",
        "paused",
        "closed",
      ],
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

    pausedAt: {
      type: Date,
      default: null,
    },

    closedAt: {
      type: Date,
      default: null,
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);

module.exports = Subscription;
