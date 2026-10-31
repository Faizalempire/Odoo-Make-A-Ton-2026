// Check whether an amount is a valid whole number of paise.
const isValidPaise = (value) => {
  return Number.isSafeInteger(value) && value >= 0;
};

// Calculate the invoice subtotal from its items.
const calculateSubtotalPaise = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Invoice must contain at least one item");
  }

  let subtotalPaise = 0;

  for (const item of items) {
    if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
      throw new Error("Item quantity must be greater than zero");
    }

    if (!isValidPaise(item.unitPricePaise)) {
      throw new Error("Unit price must be a non-negative whole number of paise");
    }

    const lineTotalPaise = Math.round(
      item.quantity * item.unitPricePaise
    );

    if (!Number.isSafeInteger(lineTotalPaise)) {
      throw new Error("Item total is too large");
    }

    subtotalPaise += lineTotalPaise;
  }

  if (!Number.isSafeInteger(subtotalPaise)) {
    throw new Error("Invoice subtotal is too large");
  }

  return subtotalPaise;
};

// Calculate a fixed or percentage discount.
const calculateDiscountPaise = (
  subtotalPaise,
  discountType,
  discountValue
) => {
  if (!isValidPaise(subtotalPaise)) {
    throw new Error("Subtotal must be a non-negative whole number of paise");
  }

  if (!Number.isFinite(discountValue) || discountValue < 0) {
    throw new Error("Discount value must be a valid non-negative number");
  }

  let discountPaise;

  if (discountType === "percentage") {
    if (discountValue > 100) {
      throw new Error("Percentage discount cannot exceed 100%");
    }

    discountPaise = Math.round(
      subtotalPaise * discountValue / 100
    );
  } else if (discountType === "fixed") {
    if (!Number.isSafeInteger(discountValue)) {
      throw new Error("Fixed discount must be a whole number of paise");
    }

    discountPaise = discountValue;
  } else {
    throw new Error("Discount type must be percentage or fixed");
  }

  return Math.min(discountPaise, subtotalPaise);
};

// Calculate tax on the amount remaining after discount.
const calculateTaxPaise = (taxableAmountPaise, taxRate) => {
  if (!isValidPaise(taxableAmountPaise)) {
    throw new Error("Taxable amount must be a non-negative whole number of paise");
  }

  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
    throw new Error("Tax rate must be between 0 and 100%");
  }

  return Math.round(taxableAmountPaise * taxRate / 100);
};

// Export functions for use in other files.
// Calculate all invoice amounts together.
const calculateInvoiceTotal = (items, discountType, discountValue, taxRate) => {
  const subtotalPaise = calculateSubtotalPaise(items);

  const discountAmountPaise = calculateDiscountPaise(
    subtotalPaise,
    discountType,
    discountValue
  );

  const taxableAmountPaise = subtotalPaise - discountAmountPaise;

  const taxAmountPaise = calculateTaxPaise(
    taxableAmountPaise,
    taxRate
  );

  const totalAmountPaise = taxableAmountPaise + taxAmountPaise;

  return {
    subtotalPaise,
    discountAmountPaise,
    taxableAmountPaise,
    taxAmountPaise,
    totalAmountPaise,
  };
};
module.exports = {
  calculateSubtotalPaise,
  calculateDiscountPaise,
  calculateTaxPaise,
  calculateInvoiceTotal,
};