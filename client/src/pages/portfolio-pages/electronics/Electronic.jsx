import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, selectProduct, selectIsLoading, getRelatedProducts } from "../../../redux/features/product/productSlice";
import Item from "./Item";
import Loader from "../../../components/global-components/Loader";


const Electronic = () => {
    const { id } = useParams();
    
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState();
    const relatedProducts = useSelector((state) => state.product.relatedProducts);
    
    const productItem = useSelector(selectProduct);
    const isLoading = useSelector(selectIsLoading);
    
    // getProduct
    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    
    useEffect(() => {
      if (productItem) {
        setProduct(productItem);
          if (productItem.category && id) { // Ensure category and id exist before fetching related blogs
              dispatch(getRelatedProducts({ category: productItem.category, productId: id }));
          }
      }
  }, [productItem, dispatch, id]);

    if (!product) {
      return <Box className="flex justify-center items-center w-full"><Loader /></Box>; // Or any loading indicator
  }

  return (
    <Box>
    {isLoading ? (
      <Loader />
    ) 
    : 
    (
      <div className='mt-3' id="portfolio">
        <Item relatedItems={relatedProducts} item={product} />
      </div>
    )}
      </Box>
    );
  };

export default Electronic;
