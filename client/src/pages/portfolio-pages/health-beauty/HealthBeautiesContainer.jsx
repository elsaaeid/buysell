import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { getProducts } from "../../../redux/features/product/productSlice";
import { CALC_CATEGORY } from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";

const HealthBeautiesContainer = () => {
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

  // Filter products to only include health and beauty
  const filteredHealthBeauty = products.filter(product => product.productType === "healthBeauty");

  // Dispatch filter action based on search input
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products: filteredHealthBeauty, search })); // Use filteredHealthBeauty for filtering
  }, [filteredHealthBeauty, search, dispatch]);

  return (
    <ItemsContainer 
      items={filteredHealthBeauty} // Use filtered health and beauty items here
      selectFilteredItems={selectFilteredProducts}
      itemPath="healthBeauty" // Correct itemPath to match the product type
      search={search}
      setSearch={setSearch}
    />
  );
};

export default HealthBeautiesContainer;