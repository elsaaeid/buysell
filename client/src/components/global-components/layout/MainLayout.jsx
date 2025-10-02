import React, { useState, useEffect, useContext } from 'react';
import Header from "../header/Header";
import Footer from "../../global-components/footer/Footer";
import Navbar from "../global/navbar/Navbar";
import BackToTopButton from "../../global-components/goToTopButton/BackToTopButton";
import { Box } from '@mui/material';
import Loader from "../Loader";
// import { ChatBotContainer } from "../chat/ChatBotContainer";
import { Context } from '../../../context/Context';
import CountdownTimer from '../countdown-timer/CountdownTimer';
import Cart from "../cart/Cart";
import { AccountMenu } from '../header/AccountMenu';
import PaymentComponent from '../payment-component/PaymentComponent';



const MainLayout = ({ children, mainItems, productsItems, cookiesContainer }) => {
    // loading State
    const [loading, setLoading] = useState(true);
    // App Context
    const { backToTop, showMenu, showCart, showPaymentMenu, setBtnState } = useContext(Context);
    const [open, setOpen] = useState(true);

    // Loading Handling Side Effect
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    // For collapsing sidebar
    const handleToggle = () => {
        setOpen(!open);
        setBtnState("");
    };

    // Adjust toggleVariants based on language and open state

    const sideContainerVariants = {
        true: {
            width: '20%',
        },
        false: {
            width: '10%',
            transition: {
                delay: 0.6
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Box className='app-container'>
                    <CountdownTimer initialDays={6} initialHours={10} initialMinutes={59} initialSeconds={59} />
                    <Header productsItems={productsItems} />
                    {showCart ? <Cart /> : null}
                    {showMenu ? <AccountMenu /> : null}
                    {showPaymentMenu ? <PaymentComponent /> : null}
                    <div className='app-content w-full flex flex-row items-center'>
                        <Navbar
                            open={open}
                            handleToggle={handleToggle}
                            sideContainerVariants={sideContainerVariants}
                            items={mainItems} 
                        />
                        <div className="side-content">
                                {children}
                            <BackToTopButton backToTop={backToTop} />
                            {/* <ChatBotContainer /> */}
                            {/* <CookieConsent /> */}
                            {cookiesContainer}
                            <Footer items={mainItems} />
                        </div>
                    </div>
                </Box>
            )}
        </>
    );
}

export default MainLayout;