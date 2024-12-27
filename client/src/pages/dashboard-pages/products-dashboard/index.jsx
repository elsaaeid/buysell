import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Header from "../../../components/dashboard-components/Header";
import ProductSummary from "../../../components/dashboard-components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { 
  getProducts, 
  deleteProduct,
  getProduct,
 } from "../../../redux/features/product/productSlice";
 import { confirmAlert } from "react-confirm-alert";
import Loader from "../../../components/global-components/Loader";
import { useTranslation } from "react-i18next";
import ProductCharts from "../../../components/dashboard-components/product-charts/ProductCharts";
import ProductList from "../../../components/dashboard-components/product/productList/ProductList";
import { useParams } from "react-router-dom";



const ProductsDashboard = () => {
  // Use Params for id 
  const { id } = useParams();
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  // Translation
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

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
    await dispatch(getProducts());
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