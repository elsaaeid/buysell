import React from "react";
import ProductsBarChart from "../productsBarChart/ProductsBarChart";
import ProductsCircleChart from "../productsCircleChart/ProductsCircleChart";
import "./ProductCharts.css";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";



const ProductCharts = ({products})=> {
    // Translation
    const { t } = useTranslation();
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
            <Box className="services-statistics flex flex-col">
                <h3
                    className="mb-3"
                    style={{
                        color: colors.grey[500],
                    }}>{t("dashboard.servicesStatistics")}</h3>
                <Box className="ProductsCharts flex justify-center items-center">
                    <ProductsBarChart products={products} />
                    <ProductsCircleChart products={products} />
                </Box>
            </Box>
    )
}
export default ProductCharts;