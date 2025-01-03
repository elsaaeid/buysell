const mongoose = require("mongoose");

// Reply Schema
const replySchema = new mongoose.Schema({
  _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true // Automatically generate an ObjectId for each reply
  },
  commentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Comment', // Reference to the Comment model
  },
  user: {
      type: String,
      required: true,
  },
  photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  reply: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from both ends
  },
  createdAt: {
      type: Date,
      default: Date.now, // Automatically set the date when the reply is created
  },
  updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the date when the reply is updated
  },
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true // Automatically generate an ObjectId for each comment
  },
  user: {
      type: String, // Store the user's name
      required: true
  },
  photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  comment: {
      type: String,
      required: true,
      trim: true // Trim whitespace from the comment
  },
  createdAt: {
      type: Date,
      default: Date.now // Set the default to the current date
  },
  replies: [replySchema] // Use the reply schema for replies
});


// Define the Rating schema
const ratingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true // Automatically generate an ObjectId for each comment
  },
  userId: { // Change from user to userId
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
  },
}, { timestamps: true });

// Product Schema
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    photo: {
      type: String,
      required: [false, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    productType: {
        type: String,
        required: [false, "Please add a product type"],
        trim: true,
    },
    hasShow: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: [false, "Please add a name"],
      trim: true,
    },
    name_ar: { // Arabic name
      type: String,
      required: false,
      trim: true,
  },
  comments: [commentSchema], // Use the comment schema for comments
  rating: {
    type: Number,
    default: 0
  },
  ratings: [ratingSchema], // Array of ratings
    sku: {
        type: [String],
        required: false,
        default: "SKU",
        trim: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    category_ar: { // Arabic category
      type: String,
      required: false,
      trim: true,
  },
    price: {
      type: Number,
      required: false,
      trim: true,
  },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    description_ar: { // Arabic description
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: Object,
      default: {},
      required: false,
    },
    productSlideImages: {
      type: [Object], // Changed to an array of objects
      default: [],
      required: false,
    },
    itemColor: {
      type: String,
      required: false,
      trim: true,
    },
    model: {
      type: String,
      required: false,
      trim: true,
    },
    model_ar: {
      type: String,
      required: false,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
        type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;