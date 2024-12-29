import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { getProducts } from "../../../redux/features/product/productSlice";
import {
  CALC_CATEGORY,
} from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";

const ClothesContainer = () => {
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

  // Filter products to only include clothes
  const filteredClothes = products.filter(product => product.productType === "clothes");

  // Dispatch filter action based on search input
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products: filteredClothes, search })); // Use filteredClothes for filtering
  }, [filteredClothes, search, dispatch]);

  return (
    <ItemsContainer 
      items={filteredClothes} // Use filtered clothes here
      selectFilteredItems={selectFilteredProducts}
      itemPath="clothe" // Corrected itemPath to plural
      search={search}
      setSearch={setSearch}
    />
  );
};

export default ClothesContainer;