const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ProductInstance = require("../models/productInstance");

exports.productinstance_list = asyncHandler(async (req, res, next) => {
  const productinstances = await ProductInstance.find().exec();
  res.json(productinstances).catch(next);
});
