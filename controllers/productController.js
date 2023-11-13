const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");
const ProductInstance = require("../models/productInstance");

exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();
  res.json(product);
});

exports.product_post = [
  body("name", "Name must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("category", "Category must be present.").trim().isLength({ min: 1 }),
  body("summary", "Description must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      summary: req.body.summary,
    });

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const productExists = await Product.findOne({
        name: req.body.name,
      }).exec();
      if (productExists) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Product already exists.",
              path: "name",
              type: "field",
              value: req.body.name,
            },
          ],
        });
      } else {
        const newProduct = await product.save();
        res.json(newProduct);
      }
    }
  }),
];

exports.product_delete = asyncHandler(async (req, res, next) => {
  const [allProductInstancesInProduct] = await Promise.all([
    ProductInstance.find({ product: req.body._id }).exec(),
  ]);

  if (allProductInstancesInProduct.length > 0) {
    res.status(401).json({
      errors: [
        {
          location: "body",
          msg: "Cannot delete product that contains instances.",
          path: "name",
          type: "field",
          value: req.body.name,
        },
      ],
    });
    return;
  } else {
    await Product.findByIdAndDelete(req.body._id).exec();
    res.json({ message: "Product deleted." });
  }
});
