const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

exports.product_list = asyncHandler(async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products).catch(next);
});
