const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ user: req.user.id }).exec();
  res.json(categories);
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const categoryProducts = await Product.find({
    user: req.user.id,
    category: req.params.id,
  }).exec();
  res.json(categoryProducts);
});

exports.category_post = [
  body("name", "Name must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("description", "Description must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      imageRef: req.body.imageRef,
    });

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const categoryExists = await Category.findOne({
        user: req.user.id,
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Category already exists.",
              path: "name",
              type: "field",
              value: req.body.name,
            },
          ],
        });
      } else {
        const newCategory = await category.save();
        res.json(newCategory);
      }
    }
  }),
];

exports.category_delete = asyncHandler(async (req, res, next) => {
  const [allProductsInCategory] = await Promise.all([
    Product.find({ user: req.user.id, category: req.body._id }).exec(),
  ]);

  if (allProductsInCategory.length > 0) {
    res.status(401).json({
      errors: [
        {
          location: "body",
          msg: "Cannot delete category with products.",
          path: "name",
          type: "field",
          value: req.body.name,
        },
      ],
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body._id).exec();
    res.json({ message: "Category deleted." });
  }
});

exports.category_update = [
  body("name", "Name must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("description", "Description must be longer than 3 characters.")
    .trim()
    .isLength({ min: 3 }),
  body("id", "ID must be present.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newCategory = new Category({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      imageRef: req.body.imageRef,
      _id: req.body.id,
    });

    console.log(newCategory);

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const categoryExists = await Category.findById(req.body.id).exec();
      if (!categoryExists) {
        res.status(401).json({
          errors: [
            {
              location: "body",
              msg: "Category does not exist.",
              path: "name",
              type: "field",
              value: req.body.name,
            },
          ],
        });
      } else {
        const databaseResponse = await Category.findByIdAndUpdate(
          req.body.id,
          newCategory,
          {}
        );
        res.json(databaseResponse);
      }
    }
  }),
];
