import React, { useEffect, useContext } from 'react';
import CartItem from "./CartItem";
import { ListGroup, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, clearCart } from '../../../redux/features/cart/cartSlice'; // Ensure clearCart is imported
import { IoCloseSharp } from "react-icons/io5";
import { Context } from '../../../context/Context';
import "./Cart.css";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify'; // Ensure toast is imported
import { tokens } from "../../../theme";
import { IconButton, useTheme } from "@mui/material";

const Cart = () => {
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { setShowCart } = useContext(Context);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart); // Use isLoading and isError for clarity
  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleClearCart = () => {
    if (items.length === 0) {
      toast.error("No items to clear!"); // Show message if cart is empty
    } else {
      dispatch(clearCart()); // Dispatch the clearCart action
    }
  };

  const toggleCart = () => {
    setShowCart(false);
  };
  

  // Calculate total amount based on price and quantity
  const totalAmount = items.reduce((total, item) => {
    return total + (item.price * item.quantity); // Assuming each item has price and quantity properties
  }, 0);

  return (
    <div onClick={()=> setShowCart(false)} className="cart__container item-menu">
      <ListGroup style={{ backgroundColor: colors.grey[900]}} className="menu">
        <div className="close">
          <span onClick={toggleCart}>
              <IconButton
                sx={{ ml: 2 }}>
              <IoCloseSharp 
                style={{
                  backgroundColor: 'transparent',
                  color: colors.grey[500],
                }}
                className='icon' />
              </IconButton>
          </span>
        </div>
        {items.length === 0 ? (
            <div className='w-full h-full flex items-center justify-center'>
              <h6 className="text-center mt-5">{t("cart.noItem")}</h6>
            </div>
          ) :
          (
            <>
              <div className="cart__item-list">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <CartItem 
                      key={index}
                      item={item} 
                    />
                  ))
                  )
                  : null
                }
              </div>

              <div className="cart__button flex items-center justify-between">
                <h6>
                  {t("cart.subtotal")}: <span>${totalAmount.toFixed(2)}</span>
                </h6>
                <button className='btn' onClick={handleClearCart}>
                  {t("cart.clearCart")}
                </button>
                <Link to="/checkout">
                  <button className='btn'>
                    {t("cart.checkout")}
                  </button>
                </Link>
              </div>
            </>
          )
        }
        </ListGroup>
    </div>
  );
};

export default Cart;