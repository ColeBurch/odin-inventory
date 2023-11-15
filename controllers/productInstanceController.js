const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ProductInstance = require("../models/productInstance");
const { body, validationResult } = require("express-validator");

exports.productinstance_list = asyncHandler(async (req, res, next) => {
  const productinstances = await ProductInstance.find().exec();
  res.json(productinstances);
});

exports.product_instance_detail = asyncHandler(async (req, res, next) => {
  const productinstance = await ProductInstance.find({
    product: req.params.id,
  }).exec();
  res.json(productinstance);
});

exports.product_specific_instances = asyncHandler(async (req, res, next) => {
  const productinstances = await ProductInstance.find({
    product: req.params.id,
  }).exec();
  res.json(productinstances);
});

exports.productInstance_post = [
  body("color", "Color must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("product", "Product must be present.").trim().isLength({ min: 1 }),
  body("size", "Size must be present.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const productInstance = new ProductInstance({
      product: req.body.product,
      quantity: req.body.quantity,
      size: req.body.size,
      color: req.body.color,
    });

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const newProductInstance = await productInstance.save();
      res.json(newProductInstance);
    }
  }),
];

exports.productInstance_delete = asyncHandler(async (req, res, next) => {
  const [productInstance] = await Promise.all([
    ProductInstance.findById(req.body._id).exec(),
  ]);

  if (productInstance.quantity > 0) {
    res.status(401).json({
      errors: [
        {
          location: "body",
          msg: "Cannot delete product instance with quantity greater than zero.",
          path: "name",
          type: "field",
          value: req.body.name,
        },
      ],
    });
    return;
  } else {
    await ProductInstance.findByIdAndDelete(req.body._id).exec();
    res.json({ message: "Product instance deleted." });
  }
});
