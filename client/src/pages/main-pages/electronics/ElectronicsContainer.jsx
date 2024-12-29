import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { getProducts } from "../../../redux/features/product/productSlice";
import { CALC_CATEGORY } from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";

const ElectronicsContainer = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Get products from the Redux store
  const products = useSelector((state) => state.product.products); // Access products directly

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Calculate products
  useEffect(() => {
    if (products.length > 0) {
      dispatch(CALC_CATEGORY(products));
    }
  }, [dispatch, products]);

  // Filter products to only include electronics
  const filteredElectronics = products.filter(product => product.productType === "electronics");

  // Dispatch filter action based on search input
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products: filteredElectronics, search })); // Use filteredElectronics for filtering
  }, [filteredElectronics, search, dispatch]);

  return (
    <ItemsContainer 
      items={filteredElectronics} // Use filtered electronics here
      selectFilteredItems={selectFilteredProducts}
      itemPath="electronic" // Corrected itemPath to plural
      search={search}
      setSearch={setSearch}
    />
  );
};

export default ElectronicsContainer;