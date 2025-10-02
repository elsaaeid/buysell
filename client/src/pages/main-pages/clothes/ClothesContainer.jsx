import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import {
  CALC_CATEGORY,
} from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";
import { Context } from "../../../context/Context";

const ClothesContainer = () => {
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