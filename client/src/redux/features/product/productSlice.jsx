import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  relatedProducts: [],
  rating: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: [],
};

// Create New Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get shows Products
export const getShowsProducts = createAsyncThunk(
  "products/getShowsProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get all related products
export const getRelatedProducts = createAsyncThunk(
  "products/getRelatedProducts",
  async ({category,productId}, thunkAPI) => {
    try {
      return await productService.getRelatedProducts({category, productId});
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Delete a Product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// commentItem
export const commentItem = createAsyncThunk(
  "products/commentItem",
  async ({ itemId, comment, userName, userPhoto }, thunkAPI) => {
    try {
      const response = await productService.commentItem({ itemId, comment, userName, userPhoto });
      // Ensure that the response contains the expected data
      if (response && response.data) {
        return response.data; // Return the data to be used as payload
      } else {
        return thunkAPI.rejectWithValue("No data returned from the server.");
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error("Error in commentItem thunk:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// Async thunk for replying to a comment
export const replyItem = createAsyncThunk(
  "products/replyItem",
  async ({ commentId, itemId, reply, userName, userPhoto }, thunkAPI) => {
    try {
      const response = await productService.replyItem(commentId, itemId, { reply, userName, userPhoto });
      // Ensure that the response contains the expected data
      if (response && response.data) {
        return response.data; // Return the data to be used as payload
      } else {
        return thunkAPI.rejectWithValue("No data returned from the server.");
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error("Error in replyItem thunk:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Async thunk for editing a comment
export const editComment = createAsyncThunk(
  "products/editComment",
  async ({ commentId, comment }, thunkAPI) => {
    try {
      const response = await productService.editComment(commentId, { comment });
      // Ensure that the response contains the expected data
      if (response && response.data) {
        return response.data; // Return the updated comment data to be used as payload
      } else {
        return thunkAPI.rejectWithValue("No data returned from the server.");
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error("Error in editComment thunk:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for deleting a comment
export const deleteComment = createAsyncThunk(
  "products/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      await productService.deleteComment(commentId); // Call the service to delete the comment
      return commentId; // Return the commentId to remove it from the state
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error("Error in deleteComment thunk:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// rateProduct 
export const rateProduct  = createAsyncThunk(
  "products/rateProduct",
  async ({ itemId, userId, rating }, thunkAPI) => {
    try {
      return await productService.rateProduct({ itemId, userId, rating });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice( {
  name: "product",
  initialState,
  reducers: {
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getShowsProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShowsProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getShowsProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getRelatedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.relatedProducts = action.payload;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // comment item
      .addCase(commentItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentItem.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const { itemId, comment, userName, userPhoto } = action.payload; // Ensure payload is defined
          const item = state.products.find((item) => item._id === itemId);
          if (item) {
            item.comments.push({ user: userName, photo: userPhoto, comment }); // Add the comment to the item's comments
          }
        } else {
          console.error("Payload is undefined:", action);
        }
      })
      .addCase(commentItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error("Error in commentItem:", action.payload);
      })
      .addCase(replyItem.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(replyItem.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        if (action.payload) {
          const { itemId, commentId, reply, userName, userPhoto } = action.payload; // Ensure payload is defined
          const item = state.products.find((item) => item._id === itemId);
          if (item) {
            // Find the comment to which the reply is being added
            const comment = item.comments.find(comment => comment._id === commentId);
            if (comment) {
              // Add the reply to the comment's replies array
              comment.replies.push({ user: userName, photo: userPhoto, reply });
            }
          }
        } else {
          console.error("Payload is undefined:", action);
        }
      })
      .addCase(replyItem.rejected, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.isError = action.payload; // Set error message
      })
      .addCase(editComment.pending, (state) => {
        state.isLoading = true; // Set loading state to true when the edit action is pending
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false when the edit action is fulfilled
        if (action.payload) {
          const { _id, comment } = action.payload; // Ensure payload is defined
          const item = state.products.find((item) => item.comments.some(comment => comment._id === _id));
          if (item) {
            const commentToEdit = item.comments.find(comment => comment._id === _id);
            if (commentToEdit) {
              commentToEdit.comment = comment; // Update the comment text
            }
          }
        } else {
          console.error("Payload is undefined:", action);
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false when the edit action is rejected
        state.isError = true; // Set error state to true
        state.message = action.payload; // Store the error message
        console.error("Error in editComment:", action.payload);
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true; // Set loading state to true when the delete action is pending
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false when the delete action is fulfilled
        if (action.payload) {
          const commentId = action.payload; // The ID of the deleted comment
          state.products.forEach(item => {
            const commentIndex = item.comments.findIndex(comment => comment._id === commentId);
            if (commentIndex !== -1) {
              item.comments.splice(commentIndex, 1); // Remove the comment from the item's comments
            }
          });
        } else {
          console.error("Payload is undefined:", action);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false when the delete action is rejected
        state.isError = true; // Set error state to true
        state.message = action.payload; // Store the error message
        console.error("Error in deleteComment:", action.payload);
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.rating = action.payload.rating; // Update the rating with the response
          state.isError = false;
          state.message = 'Rating submitted successfully!';
      })
      .addCase(rateProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || 'Failed to submit rating.';
      });
  },
});


export const { CALC_CATEGORY } =
  productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;

