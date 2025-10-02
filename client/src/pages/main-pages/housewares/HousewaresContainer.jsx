import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { CALC_CATEGORY } from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";
import { Context } from "../../../context/Context";

const HousewaresContainer = () => {
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

  // Filter products to only include housewares
  const filteredHousewares = products.filter(product => product.productType === "housewares");

  // Dispatch filter action based on search input
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products: filteredHousewares, search })); // Use filteredHousewares for filtering
  }, [filteredHousewares, search, dispatch]);

  return (
    <ItemsContainer 
      items={filteredHousewares} // Use filtered housewares here
      selectFilteredItems={selectFilteredProducts}
      itemPath="houseware" // Correct itemPath to match the product type
      search={search}
      setSearch={setSearch}
    />
  );
};

export default HousewaresContainer;