import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';
import { toast } from "react-toastify";

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async action to add a product to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (formData, thunkAPI) => {
    try {
      return await cartService.addToCart(formData);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async action to get cart items
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      return await cartService.getCartItems(); // Ensure this method exists in cartService
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async action to remove a product from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id, thunkAPI) => {
    try {
      return await cartService.removeFromCart(id);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async action to clear all items from the cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkAPI) => {
      try {
        return await cartService.clearCart(); // Ensure this method exists in cartService
      } catch (error) {
        const message =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
// Function to increase quantity
export const increaseQuantity = createAsyncThunk(
    'cart/increase',
    async (id, thunkAPI) => {
    try {
        return await cartService.increaseQuantity(id);
    } catch (error) {
        const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
    }
);

// Function to decrease quantity
export const decreaseQuantity = createAsyncThunk(
    'cart/decrease',
    async (id, thunkAPI) => {
    try {
        return await cartService.decreaseQuantity(id);
    } catch (error) {
        const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
    }
);


// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
          existingItem.totalPrice += action.payload.totalPrice;
        } else {
          state.items.push(action.payload);
        }
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(getCartItems.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        // state.isError = false;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload.items || []; // Ensure items is an array
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        // toast.success(action.payload);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        // toast.error(action.payload);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const itemToRemove = state.items.find(item => item.id === action.payload.id);
        if (itemToRemove) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(clearCart.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []; // Clear all items from the cart
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        toast.success("Cart cleared!");
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
      
        // Check if items are empty after attempting to clear the cart
        if (state.items.length === 0) {
          toast.error("No items to clear!");
        } else {
          toast.error(action.payload); // Show the error message from the action payload
        }
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const itemToIncrease = state.items.find(item => item.id === action.payload.id);
        if (itemToIncrease) {
            itemToIncrease.quantity += 1; // Increase quantity
            itemToIncrease.totalPrice = itemToIncrease.quantity * itemToIncrease.price; // Update total price
        }
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
          const itemToDecrease = state.items.find(item => item.id === action.payload.id);
          if (itemToDecrease) {
              if (itemToDecrease.quantity > 1) {
                  itemToDecrease.quantity -= 1; // Decrease quantity
                  itemToDecrease.totalPrice = itemToDecrease.quantity * itemToDecrease.price; // Update total price
              } else {
                  // If quantity is 1, remove the item from the cart
                  state.items = state.items.filter(item => item.id !== action.payload.id);
              }
          }
      })
    },
});

// Export actions and reducer
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;