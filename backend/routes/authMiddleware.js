const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }

  // Verify token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    if (user.role === "suspended") {
      res.status(403); // Use 403 Forbidden for suspended users
      throw new Error("User suspended, please contact support");
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

// Middleware to check if the user is verified
const verifiedOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next(); // User is verified, proceed
  } else {
    res.status(401);
    throw new Error("Not authorized, account not verified");
  }
});

// Middleware to allow only authors or admins
const authorOnly = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.role === "author" || req.user.role === "admin")) {
    next(); // User is an author or admin, proceed
  } else {
    res.status(403); // Use 403 Forbidden for unauthorized access
    throw new Error("Not authorized as an author");
  }
});

// Middleware to allow only admins
const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed
  } else {
    res.status(403); // Use 403 Forbidden for unauthorized access
    throw new Error("Not authorized as an admin");
  }
});

module.exports = {
  protect,
  verifiedOnly,
  authorOnly,
  adminOnly,
};