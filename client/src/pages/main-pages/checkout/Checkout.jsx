import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css';
import CartItem from '../../../components/global-components/cart/CartItem';
import cartService from '../../../redux/features/cart/cartService';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { ListGroup } from "reactstrap";
import { t } from 'i18next';
import { Context } from '../../../context/Context';

const Checkout = () => {
    // show payment menu
    const { setShowPaymentMenu } = useContext(Context);
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart); // Default to empty array if items is undefined

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await cartService.getCartItems();
                console.log('Fetched response:', response);

                const fetchedItems = response.items;

                if (Array.isArray(fetchedItems)) {
                    // Filter out items that are already in the cart to avoid duplication
                    const newItems = fetchedItems.filter(
                        (fetchedItem) => !items.some((existingItem) => existingItem.id === fetchedItem.id)
                    );

                    // Dispatch only the new items to the cart
                    newItems.forEach(item => dispatch(addToCart(item)));
                } else {
                    console.error('Expected items to be an array, but got:', fetchedItems);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [dispatch, items]); // Add `items` as a dependency to ensure the latest cart state is used

    // Calculate total amount based on price and quantity
    const totalAmount = items.reduce((total, item) => {
        return total + (item.price * item.quantity); // Assuming each item has price and quantity properties
    }, 0);

    // Payment handler
    const handlePayment = async () => {
        try {
            // Optionally show payment menu
            setShowPaymentMenu(true);
            // Send payment request to backend
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ totalAmount: Math.round(totalAmount * 100) }) // amount in cents
            });
            const data = await response.json();
            if (data.success) {
                alert('Payment key created!');
                // You can redirect to Paymob or show payment UI here
            } else {
                alert('Payment failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Payment error: ' + error.message);
        }
    };

    return (
        <div className='mt-3'>
            <h2>{t("cart.checkout")}</h2>
            <ListGroup style={{ backgroundColor: colors.grey[900] }}>
                {items.length === 0 ? (
                    <div className='w-full h-full flex items-center justify-center'>
                        <h6 className="text-center mt-5">{t("cart.noItem")}</h6>
                    </div>
                ) : (
                    <div className="checkout__container flex flex-col justify-center items-center">
                        <div className="items-list">
                            {items.map((item) => (
                                <CartItem 
                                    key={item.id}
                                    item={item} 
                                />
                            ))}
                        </div>
                        <h4 className='text-black'>{t("cart.totalAmount")}: ${totalAmount.toFixed(2)}</h4>
                        <button className='btn cursor-pointer p-1 mt-2' onClick={handlePayment}>
                            {t("cart.proceedPayment")}
                        </button>
                    </div>
                )}
            </ListGroup>
        </div>
    );
};

export default Checkout;