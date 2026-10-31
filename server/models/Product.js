const mongoose = require("mongoose");

const isValidPaise = (value) => Number.isSafeInteger(value) && value >= 0;

const productVariantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    priceAdjustmentPaise: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Price adjustment must be an integer in paise",
      },
    },
    sku: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productType: {
      type: String,
      enum: ["service", "consumable", "goods"],
      required: true,
    },
    salesPricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: isValidPaise,
        message: "Sales price must be an integer in paise",
      },
    },
    costPricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: isValidPaise,
        message: "Cost price must be an integer in paise",
      },
    },
    notes: {
      type: String,
      trim: true,
    },
    variants: [productVariantSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 1 });
productSchema.index({ productType: 1, isActive: 1 });

module.exports = mongoose.model("Product", productSchema);