import axios from "axios";

const API_URL = `${process.env.BACKEND_URL}/api/cart/`;

// Add item to cart
const addToCart = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Get cart items
const getCartItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Remove item from cart
const removeFromCart = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}removeFromCart/${id}`); // Updated URL to include the ID
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Clear cart
const clearCart = async () => {
  try {
    const response = await axios.delete(`${API_URL}clearCart`);
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to increase quantity
const increaseQuantity = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}increase/${id}`); // Updated URL to include the ID
    return response.data;
  } catch (error) {
    console.error("Error increasing item from cart:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to decrease quantity
const decreaseQuantity = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}decrease/${id}`); // Updated URL to include the ID
    return response.data;
  } catch (error) {
    console.error("Error decreasing item from cart:", error);
    throw error; // Rethrow the error for further handling
  }
};


const cartService = {
  addToCart,
  removeFromCart,
  getCartItems,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
};

export default cartService;