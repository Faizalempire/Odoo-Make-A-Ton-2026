const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  registerCustomer,
  login,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Validate request data
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

// Customer registration
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email address"),

    body("password")
      .isLength({ min: 9 })
      .withMessage("Password must contain at least 9 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/)
      .withMessage(
        "Password must contain uppercase, lowercase and a special character"
      ),
  ],
  validateRequest,
  registerCustomer
);

// User login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email address"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validateRequest,
  login
);

// Get logged-in user's profile
router.get("/me", protect, getMe);

module.exports = router;