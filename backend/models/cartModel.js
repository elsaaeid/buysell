const mongoose = require("mongoose");


// Define the schema for cart items
const cartItemSchema = new mongoose.Schema({
  id: { // Renamed from id to id for clarity
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Products",
  },
  name: { type: String, required: false },
  image: { // Change this to an object
    fileName: { type: String, required: false },
    filePath: { type: String, required: false },
    fileType: { type: String, required: false },
    fileSize: { type: String, required: false },
  },
  quantity: { type: Number, required: false, default: 1 },
  price: { type: Number, required: false, min: 0 },
  category: {
    type: String,
    required: false,
    trim: true,
  },
  productType: {
    type: String,
    required: false,
    trim: true,
  },
});

// Cart Schema
const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Changed to true to ensure every cart is associated with a user
      ref: "User",
    },
    items: [cartItemSchema],
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set the update date
  },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;