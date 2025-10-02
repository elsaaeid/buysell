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

const SchoolToolsContainer = () => {
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
      itemPath="school-tool"
      search={search}
      setSearch={setSearch}
    />
  );
};

export default SchoolToolsContainer;
