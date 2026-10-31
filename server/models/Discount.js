const mongoose = require("mongoose");

const isValidPaise = (value) => {
  return Number.isSafeInteger(value) && value >= 0;
};

const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
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

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    // Percentage value, for example 10 means 10%.
    // Fixed discount value is stored in whole paise.
    discountValue: {
      type: Number,
      required: true,
      min: 0,
     validate: {
  validator: function (value) {
    if (this.discountType === "percentage") {
      return value > 0 && value <= 100;
    }

    return Number.isSafeInteger(value) && value > 0;
  },
  message: "Percentage discounts must be between 0 and 100, and fixed discounts must be positive whole paise",
},
    },

    minimumPurchasePaise: {
      type: Number,
      default: 0,
      validate: {
        validator: isValidPaise,
        message: "Minimum purchase must be whole paise",
      },
    },

    minimumQuantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    applicableProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // Empty means the discount can apply to any subscription.
    applicableSubscriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    usageLimit: {
      type: Number,
      default: null,
      min: 1,
    },

    usageCount: {
      type: Number,
      default: 0,
      min: 0,
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

discountSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;