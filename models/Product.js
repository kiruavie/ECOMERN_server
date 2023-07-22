const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "ne peut être vide"],
    },
    price: {
      type: String,
      required: [true, "ne peut être vide"],
    },
    category: {
      type: String,
      required: [true, "ne peut être vide"],
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
