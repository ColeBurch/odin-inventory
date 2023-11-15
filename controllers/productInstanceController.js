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

exports.productInstance_update = [
  body("color", "Color must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("product", "product must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("size", "size must be present.").trim().isLength({ min: 1 }),
  body("id", "ID must be present.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newProductInstance = new ProductInstance({
      product: req.body.product,
      quantity: req.body.quantity,
      size: req.body.size,
      color: req.body.color,
      _id: req.body.id,
    });

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const productInstanceExists = await ProductInstance.findById(
        req.body.id
      ).exec();
      if (!productInstanceExists) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Product Instance does not exist.",
              path: "name",
              type: "field",
              value: req.body.name,
            },
          ],
        });
      } else {
        const databaseResponse = await ProductInstance.findByIdAndUpdate(
          req.body.id,
          newProductInstance,
          {}
        );
        res.json(databaseResponse);
      }
    }
  }),
];

exports.productInstance_addQuantity = [
  body("color", "Color must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("product", "product must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("size", "size must be present.").trim().isLength({ min: 1 }),
  body("id", "ID must be present.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const productInstanceExists = await ProductInstance.findById(
        req.body.id
      ).exec();
      if (!productInstanceExists) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Product Instance does not exist.",
              path: "name",
              type: "field",
              value: req.body.name,
            },
          ],
        });
      } else {
        if (req.body.quantity < 0) {
          res.status(401).json({
            errors: [
              {
                location: "body",
                msg: "Quantity must be positive.",
                path: "name",
                type: "field",
                value: req.body.name,
              },
            ],
          });
        } else {
          const newProductInstance = new ProductInstance({
            product: req.body.product,
            quantity: productInstanceExists.quantity + req.body.quantity,
            size: req.body.size,
            color: req.body.color,
            _id: req.body.id,
          });
          const databaseResponse = await ProductInstance.findByIdAndUpdate(
            req.body.id,
            newProductInstance,
            {}
          );
          res.json(databaseResponse);
        }
      }
    }
  }),
];

exports.productInstance_subtractQuantity = [
  body("color", "Color must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("product", "product must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("size", "size must be present.").trim().isLength({ min: 1 }),
  body("id", "ID must be present.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const productInstanceExists = await ProductInstance.findById(
        req.body.id
      ).exec();
      if (!productInstanceExists) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Product Instance does not exist.",
              path: "name",
              type: "field",
              value: req.body.name,
            },
          ],
        });
      } else {
        if (req.body.quantity > productInstanceExists.quantity) {
          res.status(401).json({
            errors: [
              {
                location: "body",
                msg: "Quantity must be less than or equal to current quantity.",
                path: "name",
                type: "field",
                value: req.body.name,
              },
            ],
          });
        } else {
          const newProductInstance = new ProductInstance({
            product: req.body.product,
            quantity: productInstanceExists.quantity - req.body.quantity,
            size: req.body.size,
            color: req.body.color,
            _id: req.body.id,
          });
          const databaseResponse = await ProductInstance.findByIdAndUpdate(
            req.body.id,
            newProductInstance,
            {}
          );
          res.json(databaseResponse);
        }
      }
    }
  }),
];
