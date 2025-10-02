import React, { useState, useMemo, useEffect, useContext } from 'react';
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
import { ThemeModeIcon } from "../ThemeModeIcon";
import { AccountIcon } from '../header/AccountIcon';
import { AccountMenu } from '../header/AccountMenu';



const DashboardLayout = ({ children, dashboardItems, productsItems }) => {
    // loading State
    const [loading, setLoading] = useState(true);
    // App Context
    const { backToTop, showMenu, showCart } = useContext(Context);
    const [open, setOpen] = useState(true);
    const { i18n } = useTranslation(); // Get the i18n instance for language detection
  const [isSmallScreen, setIsSmallScreen] = useState(false); // New state for screen size

    // Detect screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

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

  // Memoize the sideContainerVariants object to avoid re-creating it on every render
  const sideContainerVariants = useMemo(
    () => ({
      true: {
        width: isSmallScreen ? "20%" : "10%", // Adjust width for small screens
      },
      false: {
        width: isSmallScreen ? "15%" : "5%", // Adjust width for small screens
        transition: {
          delay: 0.6,
        },
      },
    }),
    [isSmallScreen]
  );

  // Memoize the sectionContainerVariants object to avoid re-creating it on every render
  const sectionContainerVariants = useMemo(
    () => ({
      true: {
        width: isSmallScreen ? "80%" : "90%", // Adjust width for small screens
        marginLeft: i18n.language === "en" ? (isSmallScreen ? "20%" : "10%") : "auto", // Adjust margin for small screens
        marginRight: i18n.language === "ar" ? (isSmallScreen ? "20%" : "10%") : "auto", // Adjust margin for small screens
        transition: {
          delay: 0.6,
        },
      },
      false: {
        width: isSmallScreen ? "85%" : "95%", // Adjust width for small screens
        marginLeft: i18n.language === "en" ? (isSmallScreen ? "15%" : "5%") : "auto", // Adjust margin for small screens
        marginRight: i18n.language === "ar" ? (isSmallScreen ? "15%" : "5%") : "auto", // Adjust margin for small screens
        transition: {
          delay: 0.6,
        },
      },
    }),
    [i18n.language, isSmallScreen]
  );

  const iconItem = (
    <span className='navLink cursor-pointer' underline="none">
      <AccountIcon className='icon' />
    </span>
  );

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
            <Box className='app-container'>
            <CountdownTimer initialDays={6} initialHours={10} initialMinutes={59} initialSeconds={59} />
            <Header productsItems={productsItems} iconItem={iconItem} />
            {showCart && <Cart />}
            {showMenu ? <AccountMenu /> : null}
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
                       <ThemeModeIcon />
                       <BackToTopButton backToTop={backToTop} />
                </motion.div>
            </div>
        </Box>
            )}
        </>
    );
}

export default DashboardLayout;