const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  res.json(categories);
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  res.json(category);
});
