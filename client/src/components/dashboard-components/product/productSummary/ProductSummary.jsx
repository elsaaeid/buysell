import React, { useEffect } from "react";
import "./ProductSummary.scss";
import CategoryIcon from '@mui/icons-material/Category';
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  selectCategory,
} from "../../../../redux/features/product/productSlice";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { useTranslation } from "react-i18next";


// Icons
const productIcon = <CategoryIcon size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;


const ProductSummary = ({ products }) => {
  // Translation
  const { t } = useTranslation();
  // A hook to access the redux dispatch function.
  const dispatch = useDispatch();
  // A hook to access the redux store's state.
  const category = useSelector(selectCategory);

  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calculating Products
  useEffect(() => {
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3
        className="mb-3"
        style={{
          color: colors.grey[500],
        }}>{t("dashboard.InventoryStats")}</h3>
      <div className="info-summary flex justify-center items-center">
        <InfoBox
          icon={productIcon}
          title={t("dashboard.TotalItems")}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={categoryIcon}
          title={t("dashboard.AllCategories")}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
