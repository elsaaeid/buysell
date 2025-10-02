import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { getShowsProducts } from "../../../redux/features/product/productSlice";
import {
  CALC_CATEGORY,
} from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";
import { Context } from "../../../context/Context";

const ShowsContainer = () => {
  const dispatch = useDispatch();
  // App Context
  const { products } = useContext(Context);
  const [search, setSearch] = useState("")
  useEffect(() => {
    dispatch(getShowsProducts());
  }, [dispatch]);

  // Calculate products
  useEffect(() => {
    if (products.length > 0) {
      dispatch(CALC_CATEGORY(products));
    }
  }, [dispatch, products]);

  // Filter products to only include shows
  const filteredShows = products.filter(product => product.hasShow);

  // Dispatch filter action based on search input
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products: filteredShows, search })); // Use filteredShows for filtering
  }, [filteredShows, search, dispatch]);

  return (
    <ItemsContainer 
      items={filteredShows}
      selectFilteredItems={selectFilteredProducts}
      itemPath="show"
      search={search}
      setSearch={setSearch}
    />
  );
};

export default ShowsContainer;