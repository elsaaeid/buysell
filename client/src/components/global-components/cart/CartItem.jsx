import React from "react";
import { ListGroupItem } from "reactstrap";
import "./CartItem.css";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CartProductManagement } from "../cart-product-management/CartProductManagement";

const CartItem = ({ item }) => {
  const id = item?.id ?? "";
  const productType = item?.productType ?? "";
  const name = item?.name ?? "";
  const name_ar = item?.name_ar ?? "";
  const price = item?.price ?? 0;
  const category = item?.category ?? "";
  const category_ar = item?.category_ar ?? "";
  const image = item?.image ?? '';
  const quantity = item?.quantity ?? 1;

  const { i18n } = useTranslation();



  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info flex flex-row justify-center items-center">
        <img src={image.filePath} alt="product-img" />
        <Box className="flex flex-col justify-center items-center">
          <p className="cart_product_category">
            {i18n.language === 'en' ? category : category_ar}
          </p>
          <p className="cart_product_name mt-2">
            {i18n.language === 'en' ? name : name_ar}
          </p>
        </Box>
        <div className="cart__product-info w-100 d-flex items-center gap-4 justify-evenly">
          <p className="flex flex-col justify-center items-center gap-5 cart__product-price">
            {quantity} x <span>${(price * quantity).toFixed(2)}</span>
          </p>
          <CartProductManagement
              _id={id}
              productType={productType}
              name={name}
              category={category}
              price={price}
              image={image}
          />
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;