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
  body("name", "Name must not be empty.").trim().isLength({ min: 3 }),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 3 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.json(category);
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.json(categoryExists);
      } else {
        const newCategory = await category.save();
        res.json(newCategory);
      }
    }
  }),
];
