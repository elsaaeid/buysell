import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Header from "../../../components/dashboard-components/Header";
import ProductSummary from "../../../components/dashboard-components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { 
  deleteProduct,
  getProduct,
 } from "../../../redux/features/product/productSlice";
 import { confirmAlert } from "react-confirm-alert";
import Loader from "../../../components/global-components/Loader";
import ProductCharts from "../../../components/dashboard-components/product-charts/ProductCharts";
import ProductList from "../../../components/dashboard-components/product/productList/ProductList";
import { useParams } from "react-router-dom";
import { Context } from "../../../context/Context";



const ProductsDashboard = () => {
  // Use Params for id 
  const { id } = useParams();
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  // Translation
  const { t, products } = useContext(Context);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  // Get Product Depend On Login Status
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [id, isLoggedIn, isError, message, dispatch]);

      // Product Deleting Function
  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
  };

  // Confirm of product Deleting Function
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  
  return (
    <Box className="w-full" p="20px">
    {isLoading ? (
      <Loader />
    ) 
    : 
    (
      <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t("dashboard.dashboard.title")} subtitle={t("dashboard.dashboard.subtitle")} />
      </Box>
      <Box>
        <ProductSummary products={products} />
        <ProductCharts products={products} />
      </Box>
      <Box className="w-full" p="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title={t("dashboard.products")} />
        </Box>
        <Box>
          <ProductList products={products} confirmDelete={confirmDelete} />
        </Box>
      </Box>
    </>
    )
    }
    </Box>
  );
};

export default ProductsDashboard;