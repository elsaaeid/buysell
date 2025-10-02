import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../../context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../../redux/features/cart/cartSlice';
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { t } from 'i18next';


export const CartProductManagement = ({
    _id,
    productType,
    name,
    category,
    price,
    image,
    cartIconClass,
    buttonClass,
}) => {
    const { items } = useSelector((state) => state.cart);
    // user select
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { isInCart, setIsInCart, quantity, setQuantity, setShowCart } = useContext(Context);
    useEffect(() => {
        const foundItem = items.find(cartItem => cartItem.id === _id);
        if (foundItem) {
          setIsInCart(false);
          setQuantity(foundItem.quantity);
        } else {
          setIsInCart(true);
          setQuantity(1);
        }
      }, [items, _id, setIsInCart, setQuantity]);



    const handleAddToCart = async () => {

        if (!user) {
            alert("Please login to add this item to cart. You will be redirected to the login page.");
            navigate("/login", { replace: true });
            return;
        }
        
        const formData = {
            id: _id,
            productType: productType,
            name: name,
            quantity: 1,
            price: price,
            image: image,
            category: category,
        };
        try {
            await dispatch(addToCart(formData)).unwrap();
            setIsInCart(false);
            setShowCart(true);
        } catch (error) {
            console.error("Error adding item:", error);
            setIsInCart(true);
        }
    };
    
    const handleRemoveFromCart = async () => {
        try {
          await dispatch(removeFromCart(_id)).unwrap();
          setIsInCart(true);
          setShowCart(true);
        } catch (error) {
          console.error("Error removing item:", error);
          setIsInCart(false);
        }
      };
    
      const handleIncrease = async () => {
        try {
          await dispatch(increaseQuantity(_id)).unwrap();
          setShowCart(true);
        } catch (error) {
          console.error("Error increasing item:", error);
        }
      };
    
      const handleDecrease = async () => {
        try {
          await dispatch(decreaseQuantity(_id)).unwrap();
          setShowCart(true);
        } catch (error) {
          console.error("Error decreasing item:", error);
        }
      };
    
      const handleTrash = () => {
        if (quantity > 1) {
          handleDecrease();
        } else if (quantity === 1) {
          handleRemoveFromCart();
        }
      };
  return (
        <Box className={cartIconClass}>
            {isInCart ? 
                <button className={`cursor-pointer p-1 ${buttonClass}`} onClick={handleAddToCart}>
                    {t("item.addToCart")}
                </button>
                : 
                <Box className="w-full flex flex-row justify-evenly items-center">
                    <button className={`cursor-pointer p-1 ${buttonClass}`} onClick={handleIncrease}>
                        <IoMdAdd size={18} />
                    </button>
                    <button className={`decrease-trash-cart-item cursor-pointer p-1 ${buttonClass}`} onClick={handleTrash}>
                    {quantity > 1 ? <IoMdRemove size={24} /> : <HiArchiveBoxXMark size={24} />}
                    </button>
                </Box>
            }
        </Box>
  )
}
