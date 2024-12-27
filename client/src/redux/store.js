import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import filterReducerAuth from "../redux/features/auth/filterSlice";
import emailReducer from "../redux/features/email/emailSlice";
import productReducer from "./features/product/productSlice";
import filterReducerProduct from "../redux/features/product/filterSlice";
import cartReducer from '../redux/features/cart/cartSlice';
import cartUiSlice from '../redux/features/cart/cartUiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filterAuth: filterReducerAuth,
    product: productReducer,
    filterReducerProduct: filterReducerProduct,
    cart: cartReducer,
    cartUi: cartUiSlice.reducer,
  },
});
