import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { CALC_CATEGORY } from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";
import { Context } from "../../../context/Context";

const HealthBeautiesContainer = () => {
  const dispatch = useDispatch();
  // App Context
  const { products } = useContext(Context);
  const [search, setSearch] = useState("");

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
      itemPath="health-beauty" // Correct itemPath to match the product type
      search={search}
      setSearch={setSearch}
    />
  );
};

export default HealthBeautiesContainer;