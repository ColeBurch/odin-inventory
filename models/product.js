const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  summary: { type: String, required: true },
  image: { type: String },
  imageRef: { type: String },
});

productSchema.virtual("url").get(function () {
  return "/products/" + this._id;
});

module.exports = mongoose.model("Product", productSchema);
