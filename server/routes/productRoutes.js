const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deactivateProduct,
} = require("../controllers/productController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

const staffOnly = [protect, authorize("admin", "internal_staff")];

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

const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("productType")
    .isIn(["service", "consumable", "goods"])
    .withMessage("Invalid product type"),

  body("salesPricePaise")
    .isInt({ min: 0 })
    .withMessage("Sales price must be a non-negative integer in paise"),

  body("costPricePaise")
    .isInt({ min: 0 })
    .withMessage("Cost price must be a non-negative integer in paise"),

  body("variants")
    .optional()
    .isArray()
    .withMessage("Variants must be an array"),

  body("variants.*.name")
    .if(body("variants").exists())
    .trim()
    .notEmpty()
    .withMessage("Each variant requires a name"),

  body("variants.*.priceAdjustmentPaise")
    .optional()
    .isInt()
    .withMessage("Variant price adjustment must be an integer in paise"),
];

router.post(
  "/",
  ...staffOnly,
  productValidation,
  validate,
  createProduct
);

router.get("/", ...staffOnly, getProducts);

router.get("/:id", ...staffOnly, getProductById);

router.put(
  "/:id",
  ...staffOnly,
  [
    body("name").optional().trim().notEmpty(),
    body("productType")
      .optional()
      .isIn(["service", "consumable", "goods"]),
    body("salesPricePaise").optional().isInt({ min: 0 }),
    body("costPricePaise").optional().isInt({ min: 0 }),
    body("variants").optional().isArray(),
    body("variants.*.name").optional().trim().notEmpty(),
    body("variants.*.priceAdjustmentPaise").optional().isInt(),
  ],
  validate,
  updateProduct
);

router.delete("/:id", ...staffOnly, deactivateProduct);

module.exports = router;