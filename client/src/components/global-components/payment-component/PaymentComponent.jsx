import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Context } from '../../../context/Context';
import { IoCloseSharp } from "react-icons/io5";
import { Box } from '@mui/material';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';


const API_URL = `${process.env.BACKEND_URL}/api/cart/`;

const PaymentComponent = () => {
    // Translation
    const { t } = useTranslation();
    // Show payment menu
    const { setShowPaymentMenu } = useContext(Context);
    const [amount, setAmount] = useState(0); // Initialize as a number
    const [loading, setLoading] = useState(false); // Loading state for payment processing
    const [error, setError] = useState(null); // Error state for handling errors

    const handleClose = () => {
        setShowPaymentMenu(false);
    };

    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { items = [] } = useSelector((state) => state.cart);
    
    // Calculate total amount based on price and quantity
    const totalAmount = items.reduce((total, item) => {
        return total + (item.price * item.quantity); // Assuming each item has price and quantity properties
    }, 0);

    useEffect(() => {
        setAmount(totalAmount); // Set amount to totalAmount
    }, [totalAmount]);

    const handlePayment = async () => {
        setLoading(true); // Set loading to true when starting payment
        setError(null); // Reset error state

        try {
            const response = await axios.post(`${API_URL}payment`, {
                totalAmount: amount * 100, // Convert to cents
            });
    
            if (response.data.success) {
                const paymentKey = response.data.paymentKey; // Store the payment key
                // Redirect to Paymob payment page
                window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${paymentKey}`;
                console.log('Payment Key:', paymentKey);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            if (error.response && error.response.data.message === 'duplicate') {
                setError('This order has already been processed.'); // Set specific error message for duplicates
            } else {
                setError('An error occurred while processing your payment. Please try again.'); // General error message
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Box className='item-menu'>
            <Box
                className='menu'
                style={{
                    backgroundColor: colors.grey[900],
                }}
            >
                <Box className="close">
                    <span onClick={handleClose}>
                        <IoCloseSharp 
                            style={{
                                backgroundColor: colors.grey[700],
                                color: colors.grey[500],
                            }}
                            className='icon' 
                        />
                    </span>
                </Box>
                <Box className='flex flex-col justify-center items-center w-full'>
                    <h2>{t("payment.integrationTitle")}</h2>
                    <h4 className='text-black mt-2'>{t("cart.totalAmount")}: ${amount.toFixed(2)}</h4>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                    <button 
                        className='btn mt-2' 
                        onClick={handlePayment} 
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? t("payment.processing") : t("payment.payNow")}
                    </button>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentComponent;