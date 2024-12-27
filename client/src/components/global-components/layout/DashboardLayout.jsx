import React, { useState, useEffect, useContext } from 'react';
import Header from "../header/Header";
import Sidebar from "../global/sidebar/Sidebar";
import BackToTopButton from "../goToTopButton/BackToTopButton";
import { Box } from '@mui/material';
import Loader from "../Loader";
import { Context } from '../../../context/Context';
import CountdownTimer from '../countdown-timer/CountdownTimer';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Cart from "../cart/Cart";



const DashboardLayout = ({ children, dashboardItems, productsItems }) => {
    // loading State
    const [loading, setLoading] = useState(true);
    // App Context
    const { backToTop, showCart } = useContext(Context);
    const [open, setOpen] = useState(true);
    const { i18n } = useTranslation(); // Get the i18n instance for language detection

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

    // Adjust sectionContainerVariants based on language
    const sectionContainerVariants = {
        true: {
            width: '80%',
            left: i18n.language === 'en' ? '20%' : 'auto', // 20% left for English
            right: i18n.language === 'ar' ? '20%' : 'auto', // 20% right for Arabic
            transition: {
                delay: 0.6
            }
        },
        false: {
            width: '90%',
            left: i18n.language === 'en' ? '10%' : 'auto', // 10% left for English
            right: i18n.language === 'ar' ? '10%' : 'auto', // 10% right for Arabic
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
            {showCart && <Cart />}
            <div className='app-content w-full flex flex-row items-center'>
                <Sidebar
                    open={open}
                    handleToggle={handleToggle}
                    sideContainerVariants={sideContainerVariants}
                    items={dashboardItems} 
                />
                <motion.div 
                    data-open={open}
                    variants={sectionContainerVariants}
                    initial={`${open}`}
                    animate={`${open}`}
                    className="side-content">
                       {children}
                       <BackToTopButton backToTop={backToTop} />
                </motion.div>
            </div>
        </Box>
            )}
        </>
    );
}

export default DashboardLayout;