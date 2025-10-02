const express = require("express");
const router = express.Router();

const { protect } = require("./authMiddleware");
const {
  addToCart,
  removeFromCart,
  getCartItems,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  processPayment,
} = require("../controllers/cartController");

// Route to add an item to the cart
router.post("/", protect, addToCart);

// Route to get all cart items
router.get("/", protect, getCartItems);

// Route to increase an item quantity of the cart
router.patch("/increase/:id", protect, increaseQuantity);

// Route to decrease an item quantity of the cart
router.patch("/decrease/:id", protect, decreaseQuantity);

// Route to remove an item from the cart
router.delete("/removeFromCart/:id", protect, removeFromCart); // Added a slash before :id

// Route to clear the cart
router.delete("/clearCart", protect, clearCart);

// Route to add an item to the cart
router.post("/payment", protect, processPayment);

module.exports = router;