const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productInstanceSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

productInstanceSchema.virtual("url").get(function () {
  return "/productInstance/" + this._id;
});

module.exports = mongoose.model("ProductInstance", productInstanceSchema);
