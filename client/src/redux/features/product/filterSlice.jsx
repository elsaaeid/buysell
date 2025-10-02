import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filterReducerProduct",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;

      // Bypass filtering if search is empty
      if (!search) {
        state.filteredProducts = products;
        return;
      }

      const tempProducts = products.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
          (product.category && product.category.toLowerCase().includes(search.toLowerCase()))
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filterReducerProduct.filteredProducts;

export default filterSlice.reducer;
