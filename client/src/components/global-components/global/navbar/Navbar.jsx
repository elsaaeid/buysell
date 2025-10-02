import React, { useEffect, useContext } from 'react';
import "./Navbar.css";
import { tokens } from "../../../../theme";
import { Tooltip, useTheme } from "@mui/material"; 
import { useLocation } from 'react-router-dom';
import { Context } from "../../../../context/Context";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import NavIcons from './NavIcons';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AccountIcon } from '../../header/AccountIcon';



const Navbar = ({
  items,
  open,
  handleToggle,
  NavContainerVariants,
}) => {
  // Translation
  const { i18n, t } = useTranslation();
  // App Context
  const { btnState, setBtnState } = useContext(Context);
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Location
  const location = useLocation();

  // Location Handling nav Effect
  useEffect(() => {
    setBtnState(location.pathname);
  }, [location, setBtnState]);

  const navItems = items.map(item => {
    if (i18n.language === 'ar') {
      return {
        id: item.id,
        title: item.title_ar,
        href: item.href,
        icon: item.icon,
      };
    }
    return item;
  });

  const spanVariants = {
    true: {
      display: 'flex',
      transition: {
        delay: 0.6
      },
      opacity: 1,
      visibility: 'visible',
    },
    false: {
      display: 'none',
      transition: {
        delay: 0.6
      },
      opacity: 0,
      visibility: 'hidden',
    }
  };

  return (
    <motion.div 
      className="navbar-container"
      data-open={open}
      variants={NavContainerVariants}
      initial={`${open}`}
      animate={`${open}`}
    >
      <motion.div  
        animate={{ rotate: open ? 0 : 180 }} // Use animate prop for rotation
        whileHover={{
          scale: 1.2,
          backdropFilter: "blur(3.5px)",
          webkitBackdropFilter: "blur(3.5px)",
          transition: {
            delay: 0.2,
            duration: 0.4,
          },
        }}
        onClick={handleToggle}          
        className='navbar-toggle flex justify-center items-center'
      >
        <MdKeyboardArrowRight />
      </motion.div>
      {navItems.map((item) => (
        <NavIcons
          style={{
            borderColor: colors.grey[500],
          }}
          key={item.id}
          titleIcon={item.title}
          hrefIcon={item.href}
          clickIcon={() => setBtnState(item.href)}
          classIcon={btnState === item.href ? 'active icon-nav-item' : 'icon-nav-item'}
          icon={item.icon}
          open={open}
          spanVariants={spanVariants}
        />
      ))}

        <Tooltip title={t("account")}>
            <span
              style={{
                color: colors.grey[500],
              }}
              className='navLink cursor-pointer' 
              underline="none" 
            >
              <span className={btnState === "account" ? 'active icon-nav-item' : 'icon-nav-item'}>
                <AccountIcon className='icon' />
              </span>
              <motion.span 
                initial={open.toString()} // Convert boolean to string
                animate={open.toString()} // Convert boolean to string
                variants={spanVariants} 
                className="mt-1"
              >
                {t("account")}
              </motion.span>
            </span>
        </Tooltip>
    </motion.div>
  );
}

export default Navbar;

