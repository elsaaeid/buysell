const express = require("express");
const router = express.Router();

const {
  protect
} = require("./authMiddleware");
const {
  createProduct,
  getProducts,
  getShowProducts,
  getRelatedProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  commentItem,
  replyItem,
  editComment,
  deleteComment,
  rateProduct,
} = require("../controllers/productsController");
const { upload } = require("../utils/fileUpload");

// Product routes
router.post("/", protect, upload.fields([{ name: 'image' }, { name: 'productSlideImages' }]), createProduct);
router.patch("/:id", protect, upload.fields([{ name: 'image' }, { name: 'productSlideImages' }]), updateProduct);
router.get("/", getProducts);
router.get("/", getShowProducts);
router.get("/related/:category/:productId", getRelatedProducts);
router.get("/:id", getProduct);
router.delete("/:id", protect, deleteProduct);
router.post('/:itemId', protect, commentItem);
router.post('/:itemId/comments/:commentId', protect, replyItem);
// Route to edit a specific comment
router.put('/comments/:commentId', protect, editComment);
// Route to delete a specific comment
router.delete('/comments/:commentId', protect, deleteComment);

// Route to rate of stars
router.post('/:itemId/rate', protect, rateProduct);

module.exports = router;
