const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  imageRef: { type: String },
});

categorySchema.virtual("url").get(function () {
  return "/category/" + this._id;
});

module.exports = mongoose.model("Category", categorySchema);
