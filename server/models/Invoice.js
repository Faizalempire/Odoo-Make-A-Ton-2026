const mongoose = require("mongoose");

// Check that a monetary amount is a valid whole number of paise.
const isValidPaise = (value) => {
  return Number.isSafeInteger(value) && value >= 0;
};

// Individual invoice item snapshot.
const invoiceItemSchema = new mongoose.Schema(
  {
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
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isFinite,
        message: "Quantity must be a valid number",
      },
    },

    unitPricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: isValidPaise,
        message: "Unit price must be a non-negative whole number of paise",
      },
    },

    taxRate: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isFinite,
        message: "Tax rate must be a valid number",
      },
    },
  },
  {
    _id: true,
  }
);

// Main invoice schema.
const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
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

    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    items: {
      type: [invoiceItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "An invoice must contain at least one item",
      },
    },

    subtotalPaise: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Subtotal must be a non-negative whole number of paise",
      },
    },

    discountAmountPaise: {
      type: Number,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Discount must be a non-negative whole number of paise",
      },
    },

    taxAmountPaise: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Tax must be a non-negative whole number of paise",
      },
    },

    totalAmountPaise: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Total must be a non-negative whole number of paise",
      },
    },

    amountPaidPaise: {
      type: Number,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Amount paid must be a non-negative whole number of paise",
      },
    },

    amountDuePaise: {
      type: Number,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Amount due must be a non-negative whole number of paise",
      },
    },

    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
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
        "confirmed",
        "partially_paid",
        "paid",
        "cancelled",
      ],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

// Derive outstanding balance and payment status before validation.
invoiceSchema.pre("validate", function () {
  if (
    !Number.isSafeInteger(this.totalAmountPaise) ||
    !Number.isSafeInteger(this.amountPaidPaise) ||
    this.totalAmountPaise < 0 ||
    this.amountPaidPaise < 0
  ) {
    return;
  }

  if (this.amountPaidPaise > this.totalAmountPaise) {
    this.invalidate(
      "amountPaidPaise",
      "Overpayment is not allowed"
    );
    return;
  }

  this.amountDuePaise =
    this.totalAmountPaise - this.amountPaidPaise;

  // Preserve draft and cancelled states.
  if (this.status === "draft" || this.status === "cancelled") {
    return;
  }

  // Derive payment status from the outstanding balance.
  if (this.amountPaidPaise === this.totalAmountPaise &&
      this.totalAmountPaise > 0) {
    this.status = "paid";
  } else if (this.amountPaidPaise > 0) {
    this.status = "partially_paid";
  } else {
    this.status = "confirmed";
  }
});

// Create a unique index for invoice numbers.

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;