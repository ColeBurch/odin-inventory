const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).exec();
  res.json(product);
});
