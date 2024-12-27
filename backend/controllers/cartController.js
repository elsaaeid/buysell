const axios = require('axios');
const Cart = require('../models/cartModel');
const Products = require('../models/productsModel');
const Payment = require('../models/paymentModel');
const Order = require('../models/orderModel');
const { OAuth2Client } = require("google-auth-library");
// Vodafone Cash API endpoint
const VODAFONE_CASH_API_URL = 'https://api.vodafone.com/v1/payments';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// Add to Cart
const addToCart = async (req, res) => {
    const { id, name, quantity, category, image, productType } = req.body;
    const userId = req.user?.id; // Ensure user ID is available in req.user

    try {
        // Validate input
        if (!id || !name || !quantity || !category || !image || !productType) {
            return res.status(400).json({ message: 'Missing required fields: id, quantity, or productType' });
        }

        let product = await Products.findById(id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.id.toString() === id);

        if (existingItem) {
            // Update the quantity and total price
            existingItem.quantity += quantity;
            existingItem.totalPrice = product.price * existingItem.quantity; // Update total price based on new quantity
        } else {
            // Add new item to the cart
            cart.items.push({
                id: product._id, // Use id for consistency
                productType: product.productType,
                name: product.name,
                quantity,
                category: product.category,
                image: product.image,
                price: product.price,
            });
        }

        // Save the cart
        await cart.save();

        // Return success response
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};

// Get Cart Items
const getCartItems = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const cart = await Cart.findOne({ userId }); // Fetch the cart for the user
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ items: cart.items }); // Return the items in the cart
    } catch (error) {
        console.error('Error fetching cart items:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
};

// Remove From Cart
const removeFromCart = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters

    try {
        // Find the cart and remove the item
        const cart = await Cart.findOne({ userId: req.user.id }); // Assuming you have user authentication
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemToRemove = cart.items.find(item => item.id.toString() === id);
        if (!itemToRemove) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item.id.toString() !== id);
        cart.totalAmount -= itemToRemove.totalPrice; // Update total amount

        await cart.save(); // Save the updated cart
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Clear Cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }); // Assuming you have user authentication
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Clear all items from the cart
        cart.items = [];
        cart.totalAmount = 0; // Reset total amount

        await cart.save(); // Save the updated cart
        res.status(200).json({ message: "Cart cleared", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Function to increase the quantity of an item in the cart
const increaseQuantity = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        // Find the cart and remove the item
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemToIncrease = cart.items.find(item => item.id.toString() === id);
        if (!itemToIncrease) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (itemToIncrease) {
            // Increase the item in the cart
            itemToIncrease.quantity += 1;
            itemToIncrease.totalPrice += itemToIncrease.price;
        }

        await cart.save(); // Save the updated cart
        res.status(200).json({ message: "Item increased in cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Function to decrease the quantity of an item in the cart
const decreaseQuantity = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the cart and remove the item
        const cart = await Cart.findOne({ userId: req.user.id }); // Assuming you have user authentication
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemToDecreased = cart.items.find(item => item.id.toString() === id);
        if (!itemToDecreased) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        if (itemToDecreased) {
            // Decreased the item in the cart
            itemToDecreased.quantity -= 1;
            itemToDecreased.totalPrice -= itemToDecreased.price;
        }
        else {
            cart.items = cart.items.filter(item => item.id.toString() !== id);
        }

        await cart.save(); // Save the updated cart
        res.status(200).json({ message: "Item decreased in cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Paymob API credentials
const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_AUTH_URL = 'https://accept.paymob.com/api/auth/tokens';
const PAYMOB_ORDER_URL = 'https://accept.paymob.com/api/ecommerce/orders';
const PAYMOB_PAYMENT_URL = 'https://accept.paymob.com/api/acceptance/payment_keys';

// Payment processing
const processPayment = async (req, res) => {
    const { totalAmount } = req.body;
    try {
        // Step 1: Authenticate and get the token
        const authResponse = await axios.post(PAYMOB_AUTH_URL, {
            api_key: PAYMOB_API_KEY,
        });

        const token = authResponse.data.token;

        // Step 2: Create an order
        const orderResponse = await axios.post(PAYMOB_ORDER_URL, {
            auth_token: token,
            amount_cents: totalAmount, // Amount in cents
            currency: 'EGP',
            items: [],
        });

        const orderId = orderResponse.data.id;

        // Step 3: Create a payment key
        const paymentResponse = await axios.post(PAYMOB_PAYMENT_URL, {
            auth_token: token,
            amount_cents: totalAmount,
            order_id: orderId,
            currency: 'EGP',
            integration_id: PAYMOB_INTEGRATION_ID, // Your integration ID
        });

        res.json({
            success: true,
            paymentKey: paymentResponse.data.payment_key,
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ success: false, message: 'Payment processing failed.' });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    processPayment,
};