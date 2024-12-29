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


const ProductsContainer = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  //getProducts
  const { products } = useSelector(
    (state) => state.product
    );
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  

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