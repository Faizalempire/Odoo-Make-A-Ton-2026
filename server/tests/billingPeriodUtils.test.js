const assert = require("node:assert/strict");

const {
  addBillingInterval,
  calculateBillingPeriod,
} = require("../utils/billingPeriodUtils");

const toISO = (date) => date.toISOString();

let passed = 0;

const test = (name, callback) => {
  try {
    callback();
    passed++;
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    throw error;
  }
};

// 1. Daily billing
test("daily billing adds one day", () => {
  const result = calculateBillingPeriod(
    "2026-01-10T00:00:00.000Z",
    "daily"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-01-11T00:00:00.000Z"
  );
});

// 2. Weekly billing
test("weekly billing adds one week", () => {
  const result = calculateBillingPeriod(
    "2026-01-05T00:00:00.000Z",
    "weekly"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-01-12T00:00:00.000Z"
  );
});

// 3. Every two weeks
test("weekly billing supports an interval count of two", () => {
  const result = calculateBillingPeriod(
    "2026-01-05T00:00:00.000Z",
    "weekly",
    2
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-01-19T00:00:00.000Z"
  );
});

// 4. Monthly billing
test("monthly billing adds one month", () => {
  const result = calculateBillingPeriod(
    "2026-01-15T00:00:00.000Z",
    "monthly"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-02-15T00:00:00.000Z"
  );
});

// 5. Month-end handling
test("monthly billing clamps January 31 to February 28", () => {
  const result = calculateBillingPeriod(
    "2026-01-31T00:00:00.000Z",
    "monthly"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-02-28T00:00:00.000Z"
  );
});

// 6. Every three months
test("monthly billing supports an interval count of three", () => {
  const result = calculateBillingPeriod(
    "2026-01-31T00:00:00.000Z",
    "monthly",
    3
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-04-30T00:00:00.000Z"
  );
});

// 7. Yearly billing
test("yearly billing adds one year", () => {
  const result = calculateBillingPeriod(
    "2026-06-15T00:00:00.000Z",
    "yearly"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2027-06-15T00:00:00.000Z"
  );
});

// 8. Leap-year handling
test("yearly billing clamps February 29 in a non-leap year", () => {
  const result = calculateBillingPeriod(
    "2024-02-29T00:00:00.000Z",
    "yearly"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2025-02-28T00:00:00.000Z"
  );
});

// 9. Preserve the time of day
test("billing calculation preserves the UTC time", () => {
  const result = calculateBillingPeriod(
    "2026-03-01T14:30:00.000Z",
    "daily"
  );

  assert.equal(
    toISO(result.billingPeriodEnd),
    "2026-03-02T14:30:00.000Z"
  );
});

// 10. Reject invalid intervals
test("unsupported billing intervals are rejected", () => {
  assert.throws(
    () => addBillingInterval(
      new Date("2026-01-01T00:00:00.000Z"),
      "hourly"
    ),
    /Billing interval must be/
  );
});

// 11. Reject invalid interval counts
test("zero interval count is rejected", () => {
  assert.throws(
    () => addBillingInterval(
      new Date("2026-01-01T00:00:00.000Z"),
      "monthly",
      0
    ),
    /positive whole number/
  );
});

// 12. Reject invalid dates
test("invalid start dates are rejected", () => {
  assert.throws(
    () => calculateBillingPeriod(
      "not-a-date",
      "monthly"
    ),
    /valid billing period start date/
  );
});

console.log(`\n${passed} tests passed.`);