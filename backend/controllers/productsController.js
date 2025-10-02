const asyncHandler = require("express-async-handler");
const Products = require("../models/productsModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;



// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { 
    productType,
    hasShow,
    name, 
    name_ar, 
    sku, 
    category, 
    category_ar, 
    price,
    description, 
    description_ar, 
    itemColor,
    model,
    model_ar,
  } = req.body;

  // Validation
  // if (!hasShow || !productType || !name || !category || !description) {
  //   res.status(400);
  //   throw new Error("Please fill in all required fields");
  // }

  // Handle Image upload
  let imageFileData = {};
  if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
    try {
      const uploadedFile = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "Portfolio React",
        resource_type: "image",
      });

      imageFileData = {
        fileName: req.files.image[0].originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.files.image[0].mimetype,
        fileSize: fileSizeFormatter(req.files.image[0].size, 2),
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  // Handle productSlideImages upload
  let productSlideImagesData = [];
  if (req.files && req.files.productSlideImages) {
    try {
      const uploadPromises = req.files.productSlideImages.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: "Portfolio React",
          resource_type: "image",
        })
      );

      const uploadedFiles = await Promise.all(uploadPromises);
      productSlideImagesData = uploadedFiles.map(uploadedFile => ({
        fileName: uploadedFile.originalname,
        filePath: uploadedFile.secure_url,
        fileType: uploadedFile.mimetype,
        fileSize: fileSizeFormatter(uploadedFile.size, 2),
      }));
    } catch (error) {
      res.status(500);
      throw new Error("Product images could not be uploaded");
    }
  }

  // Create Product
  const product = await Products.create({
    user: req.user.id,
    hasShow,
    productType,
    name,
    name_ar,
    sku,
    category,
    category_ar,
    price,
    description,
    description_ar,
    itemColor,
    model,
    model_ar,
    image: imageFileData,
    productSlideImages: productSlideImagesData, // Store all product images
  });

  res.status(201).json(product);
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    hasShow,
    productType,       
    name, 
    name_ar, 
    category, 
    category_ar, 
    price,
    description, 
    description_ar,
    itemColor,
    model,
    model_ar,
  } = req.body;
  
  const { id } = req.params;

  const product = await Products.findById(id);

  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let imageFileData = {};
  if (req.files && req.files.image) {
    try {
      const uploadedFile = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "Portfolio React",
        resource_type: "image",
      });

      imageFileData = {
        fileName: req.files.image[0].originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.files.image[0].mimetype,
        fileSize: fileSizeFormatter(req.files.image[0].size, 2),
      };
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  // Handle productSlideImages upload
  let productSlideImagesData = [];
  if (req.files && req.files.productSlideImages) {
    try {
      const uploadPromises = req.files.productSlideImages.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: "Portfolio React",
          resource_type: "image",
        })
      );

      const uploadedFiles = await Promise.all(uploadPromises);
      productSlideImagesData = uploadedFiles.map(uploadedFile => ({
        fileName: uploadedFile.originalname,
        filePath: uploadedFile.secure_url,
        fileType: uploadedFile.mimetype,
        fileSize: fileSizeFormatter(uploadedFile.size, 2),
      }));
    } catch (error) {
      res.status(500);
      throw new Error("Product images could not be uploaded");
    }
  }

  // Update Product
  const updatedProduct = await Products.findByIdAndUpdate(
    id,
    {
        hasShow,
        productType,
        name,
        name_ar,
        category,
        category_ar,
        price,
        description,
        description_ar,
        itemColor,
        model,
        model_ar,
        image: Object.keys(imageFileData).length === 0 ? product.image : imageFileData,
        productSlideImages: productSlideImagesData.length > 0 ? productSlideImagesData : product.productSlideImages,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});


// Get all Products
const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all shows products
const getShowProducts = async (req, res) => {
  const productsWithShows = Products.filter(product => product.hasShow);
  res.json(productsWithShows);
};


// Get all related product by category
const getRelatedProducts = asyncHandler(async (req, res) => {
  const { category, productId } = req.params; // Destructure category and productId from params

  // Validate category input
  if (!category) {
      return res.status(400).json({ message: "Category is required" });
  }

  try {
      // Fetch the product that matches the productId to compare names
      const foundProduct = await Products.findById(productId);
      if (!foundProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      // Fetch related products by category
      const products = await Products.find({ category }).limit(5); // Fetch related products

      // Filter out products with the same name as the found product
      const filteredProducts = products.filter(product => product.name !== foundProduct.name);

      // if (!filteredProducts.length) {
      //     return res.status(404).json({ message: "No related products found" });
      // }

      res.status(200).json(filteredProducts); // Return the filtered products
  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

//commentItem
const commentItem = async (req, res) => {
  const itemId = req.params.itemId;
  const { comment, userName, userPhoto } = req.body;

  // Log incoming data
  console.log("Received data:", { itemId, comment, userName, userPhoto });

  // Validate input
  if (!comment || !userName || !userPhoto) {
      return res.status(400).json({ message: "Comment and user name are required." });
  }

  // Check if itemId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID format." });
  }

  // Find the item post by ID
  const item = await Products.findById(itemId);
  if (!item) {
      return res.status(404).json({ message: "Item post not found." });
  }

  // Create a new comment object
  const newComment = {
      user: userName,
      photo: userPhoto,
      comment: comment,
      createdAt: new Date()
  };

  // Add the new comment to the item's comments array
  item.comments.push(newComment);

  // Save the updated item post
  await item.save();

  // Log the response being sent back
  console.log("Response data:", { message: "Comment added successfully.", comment: newComment });
  res.status(200).json({ message: "Comment added successfully.", comment: newComment });
};

// Reply to a comment
const replyItem = async (req, res) => {
  const { itemId, commentId } = req.params;
  const { reply, userName, userPhoto } = req.body; // Assuming userId is sent with the reply

  // Log incoming data
  console.log("Received data:", { itemId, commentId, reply, userName, userPhoto });
  
  // Validate incoming data
  if (!reply || !userName || !userPhoto) {
      return res.status(400).json({ message: 'Reply and userId are required.' });
  }

  try {
      // Find the item post by ID
      const item = await Products.findById(itemId);
      if (!item) {
          return res.status(404).json({ message: 'Item not found.' });
      }

      // Find the comment by ID
      const comment = item.comments.id(commentId);
      if (!comment) {
          return res.status(404).json({ message: 'Comment not found.' });
      }

      // Create a new reply object
      const newReply = {
          commentId: commentId, // Reference to the comment being replied to
          user: userName,
          photo: userPhoto,
          reply: reply,
          createdAt: new Date()
      };

      // Push the new reply into the comment's replies array
      comment.replies.push(newReply);

      // Save the updated item document
      await item.save();

      // Return the updated comment with replies
      return res.status(200).json(comment);
  } catch (error) {
      console.error('Error replying to comment:', error);
      return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to edit a comment
const editComment = async (req, res) => {
  const { commentId } = req.params; // Extract commentId from the request parameters
  const { comment } = req.body; // Extract the new comment text from the request body

  // Log incoming data
  console.log("Editing comment:", { commentId, comment });

  // Validate input
  if (!comment) {
      return res.status(400).json({ message: "Comment text is required." });
  }

  // Check if commentId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID format." });
  }

  // Find the item post that contains the comment
  const item = await Products.findOne({ "comments._id": commentId });
  if (!item) {
      return res.status(404).json({ message: "Comment not found." });
  }

  // Find the comment to edit
  const commentToEdit = item.comments.id(commentId);
  if (!commentToEdit) {
      return res.status(404).json({ message: "Comment not found." });
  }

  // Update the comment text
  commentToEdit.comment = comment;

  // Save the updated item post
  await item.save();

  // Log the response being sent back
  console.log("Response data:", { message: "Comment updated successfully.", comment: commentToEdit });
  res.status(200).json({ message: "Comment updated successfully.", comment: commentToEdit });
};

// Function to delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params; // Extract commentId from the request parameters

  // Log incoming data
  console.log("Attempting to delete comment with ID:", commentId);

  // Check if commentId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID format." });
  }

  // Attempt to find the item and remove the comment
  const item = await Products.findOneAndUpdate(
      { "comments._id": commentId }, // Find item with the comment
      { $pull: { comments: { _id: commentId } } }, // Remove the comment
      { new: true } // Return the updated item
  );

  // Check if the item was found and updated
  if (!item) {
      return res.status(404).json({ message: "Comment not found." });
  }

  // Successfully deleted the comment
  res.status(200).json({ message: "Comment deleted successfully." });
};

// Function to rate a product
const rateProduct = async (req, res) => {
  const userId = req.user._id;
  const { rating } = req.body; // Extract userId and rating from the request body
  const { itemId } = req.params; // Extract itemId from the request parameters

  try {
      // Validate input
      if (!userId || typeof rating === 'undefined' || rating < 1 || rating > 5) {
          return res.status(400).json({ message: "Invalid input. Rating must be between 1 and 5." });
      }

      // Find the product by ID
      const product = await Products.findById(itemId);
      if (!product) {
          return res.status(404).json({ message: "Product not found." });
      }

      // Check if the user has already rated the product
      const existingRatingIndex = product.ratings.findIndex(r => r.userId.toString() === userId);
      if (existingRatingIndex !== -1) {
          // Update existing rating
          product.ratings[existingRatingIndex].rating = rating;
      } else {
          // Add new rating
          product.ratings.push({ userId, rating });
      }

      // Calculate the new average rating
      const totalRatings = product.ratings.reduce((sum, r) => sum + r.rating, 0);
      product.rating = totalRatings / product.ratings.length;

      // Save the updated product
      await product.save();

      // Return the updated product data
      res.status(200).json({ _id: product._id, rating: product.rating, ratings: product.ratings });
  } catch (error) {
      console.error("Error rating product:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
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
};

