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

const SchoolToolsContainer = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Get products from the Redux store
  const products = useSelector((state) => state.product.products); // Ensure you're accessing the correct state

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Calculate products
  useEffect(() => {
    if (products.length > 0) {
      dispatch(CALC_CATEGORY(products));
    }
  }, [dispatch, products]);

  // Filter products to only include school tools
  const filteredSchoolTools = products.filter(product => product.productType === "schoolTool");

  // Dispatch filter action based on search input
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products: filteredSchoolTools, search })); // Use filteredSchoolTools for filtering
  }, [filteredSchoolTools, search, dispatch]);

  return (
    <ItemsContainer 
      items={filteredSchoolTools}
      selectFilteredItems={selectFilteredProducts}
      itemPath="schoolTool"
      search={search}
      setSearch={setSearch}
    />
  );
};

export default SchoolToolsContainer;