import axios from "axios";

const API_URL = `${process.env.BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get shows products
const getShowsProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


// Get all related products
const getRelatedProducts = async ({category, productId}) => {
  const response = await axios.get(`${API_URL}related/${category}/${productId}`);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// commentItem
const commentItem = async ({ itemId, comment, userName, userPhoto }) => {
  const response = await axios.post(`${API_URL}${itemId}`, { comment, userName, userPhoto });
  return response.data;
};

// Service function to reply to a comment
const replyItem = async (commentId, itemId, { reply, userName, userPhoto }) => {
  const response = await axios.post(`${API_URL}${itemId}/comments/${commentId}`, { reply, userName, userPhoto });
  return response.data; // Return the response data
};


// Service function to edit a comment
const editComment = async (commentId, { comment }) => {
  const response = await axios.put(`${API_URL}comments/${commentId}`, { comment });
  return response.data; // Return the updated comment data
};

// Service function to delete a comment
const deleteComment = async (commentId) => {
  await axios.delete(`${API_URL}comments/${commentId}`); // Send a DELETE request
  return commentId; // Return the commentId to confirm deletion
};

// rateProduct
const rateProduct = async ({ itemId, userId, rating }) => {
  const response = await axios.post(`${API_URL}${itemId}/rate`, { userId, rating });
  return response.data;
};


const productService = {
  createProduct,
  getProducts,
  getShowsProducts,
  getRelatedProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  commentItem,
  replyItem,
  editComment,
  deleteComment,
  rateProduct,
};

export default productService;
