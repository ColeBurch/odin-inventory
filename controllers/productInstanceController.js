const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ProductInstance = require("../models/productInstance");

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
