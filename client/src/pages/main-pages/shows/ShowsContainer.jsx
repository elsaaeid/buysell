import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import { getShowsProducts } from "../../../redux/features/product/productSlice";
import {
  CALC_CATEGORY,
} from "../../../redux/features/product/productSlice";
import ItemsContainer from "../../../components/global-components/items-container/ItemsContainer";

const ShowsContainer = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Get products from the Redux store
  const products = useSelector((state) => state.product.products); // Ensure you're accessing the correct state

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