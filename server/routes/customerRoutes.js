const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

const staffOnly = [protect, authorize("admin", "internal_staff")];

router.post(
  "/",
  staffOnly,
  [
    body("name").trim().notEmpty().withMessage("Customer name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
  ],
  validate,
  createCustomer
);

router.get("/", ...staffOnly, getCustomers);

router.get("/:id", ...staffOnly, getCustomerById);

router.put(
  "/:id",
  ...staffOnly,
  [
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Enter a valid email"),
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty"),
  ],
  validate,
  updateCustomer
);

router.delete("/:id", ...staffOnly, deleteCustomer);

module.exports = router;