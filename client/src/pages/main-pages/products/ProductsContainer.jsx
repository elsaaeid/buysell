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


const ProductsContainer = () => {

  // App Context
  const { products } = useContext(Context);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

// calculate products
useEffect(() => {
  dispatch(CALC_CATEGORY(products));
}, [dispatch, products]);

// const productsLength = products.length;
  // console.log(productsLength)
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);


  return (
    <ItemsContainer 
      items={products}
      selectFilteredItems={selectFilteredProducts}
      itemPath="product"
      search={search}
      setSearch={setSearch}
    />
  );
};

export default ProductsContainer;