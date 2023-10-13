const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  res.json(categories);
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.json(category);
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
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res
          .status(401)
          .json({
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
