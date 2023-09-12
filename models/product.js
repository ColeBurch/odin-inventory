const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  summary: { type: String, required: true },
});

productSchema.virtual("url").get(function () {
  return "/products/" + this._id;
});

module.exports = mongoose.model("Product", productSchema);
