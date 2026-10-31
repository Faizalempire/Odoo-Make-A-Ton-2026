// Calculate billing periods without depending on Mongoose
// or any Subscription/Plan schema.

const VALID_INTERVALS = ["daily", "weekly", "monthly", "yearly"];

const isValidDate = (date) => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};

// Return the number of days in a particular UTC month.
const getDaysInMonth = (year, month) => {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
};

// Add months while preserving the time and clamping month-end dates.
// Example: January 31 + 1 month = February 28 (or 29 in a leap year).
const addMonths = (date, monthsToAdd) => {
  const result = new Date(date.getTime());

  const originalDay = result.getUTCDate();

  const targetMonthIndex =
    result.getUTCFullYear() * 12 +
    result.getUTCMonth() +
    monthsToAdd;

  const targetYear = Math.floor(targetMonthIndex / 12);
  const targetMonth = targetMonthIndex % 12;

  const lastDayOfTargetMonth = getDaysInMonth(
    targetYear,
    targetMonth
  );

  result.setUTCDate(1);
  result.setUTCFullYear(
    targetYear,
    targetMonth,
    Math.min(originalDay, lastDayOfTargetMonth)
  );

  return result;
};

// Add one or more billing intervals to a date.
const addBillingInterval = (
  date,
  billingInterval,
  billingIntervalCount = 1
) => {
  if (!isValidDate(date)) {
    throw new Error("A valid billing period start date is required");
  }

  if (!VALID_INTERVALS.includes(billingInterval)) {
    throw new Error(
      "Billing interval must be daily, weekly, monthly, or yearly"
    );
  }

  if (
    !Number.isSafeInteger(billingIntervalCount) ||
    billingIntervalCount < 1
  ) {
    throw new Error(
      "Billing interval count must be a positive whole number"
    );
  }

  const result = new Date(date.getTime());

  switch (billingInterval) {
    case "daily":
      result.setUTCDate(
        result.getUTCDate() + billingIntervalCount
      );
      break;

    case "weekly":
      result.setUTCDate(
        result.getUTCDate() + billingIntervalCount * 7
      );
      break;

    case "monthly":
      return addMonths(result, billingIntervalCount);

    case "yearly":
      return addMonths(result, billingIntervalCount * 12);

    default:
      throw new Error("Unsupported billing interval");
  }

  return result;
};

// Calculate one billing period.
// The end date is exclusive: [start, end).
const calculateBillingPeriod = (
  periodStart,
  billingInterval,
  billingIntervalCount = 1
) => {
  const start = new Date(periodStart);

  if (!isValidDate(start)) {
    throw new Error("A valid billing period start date is required");
  }

  const end = addBillingInterval(
    start,
    billingInterval,
    billingIntervalCount
  );

  return {
    billingPeriodStart: start,
    billingPeriodEnd: end,
  };
};

module.exports = {
  addBillingInterval,
  calculateBillingPeriod,
};