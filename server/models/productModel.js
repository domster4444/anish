const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a  name"],
    },
    category: {
      type: String,
      required: [true, "Please add a  name"],
    },
    unit: {
      type: String,
      required: [true, "Please add a  name"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
