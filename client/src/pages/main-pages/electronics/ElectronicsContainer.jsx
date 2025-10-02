import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { CALC_CATEGORY } from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";
import { Context } from "../../../context/Context";

const ElectronicsContainer = () => {
  // App Context
  const { products } = useContext(Context);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
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