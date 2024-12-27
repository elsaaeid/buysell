import React, { useEffect, useContext } from 'react';
import "./Sidebar.css";
import { Box, Tooltip } from "@mui/material"; 
import { useLocation } from 'react-router-dom';
import { Context } from "../../../../context/Context";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SideIcons from './SideIcons';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Sidebar = ({
  items,
  open,
  handleToggle,
  sideContainerVariants,
}) => {
  // Translation
  const { i18n } = useTranslation();
  // App Context
  const { btnState, setBtnState } = useContext(Context);
  // Location
  const location = useLocation();

  // Location Handling Side Effect
  useEffect(() => {
    setBtnState(location.pathname);
  }, [location, setBtnState]);

  const sideItems = items.map(item => {
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
      className="sidebar-container"
      data-open={open} // Changed from data-Open to data-open
      variants={sideContainerVariants}
      initial={`${open}`}
      animate={`${open}`}
    >
      <Tooltip title={open ? "Collapse" : "Expand"}>
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
          className='sidebar-toggle flex justify-center items-center mt-3'
        >
          <MdKeyboardArrowRight />
        </motion.div>
      </Tooltip>
      <Box className="side-items"
        style={{
          alignItems: open ? '' : 'center',
        }}
      >
        {sideItems.map((item) => (
          <SideIcons
            styleIcon={{
              borderRadius: i18n.language === 'en' ? "0px 40px 40px 0px" : "40px 0px 0px 40px",
              borderLeft: btnState === item.href ? (i18n.language === 'en' ? "4px solid var(--color-primary)" : "0px solid var(--color-primary)") : "0px solid var(--color-primary)",
              borderRight: btnState === item.href ? (i18n.language === 'ar' ? "4px solid var(--color-primary)" : "0px solid var(--color-primary)") : "0px solid var(--color-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderLeft = i18n.language === 'en' ? "4px solid var(--color-primary)" : "0px solid var(--color-primary)";
              e.currentTarget.style.borderRight = i18n.language === 'ar' ? "4px solid var(--color-primary)" : "0px solid var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderLeft = btnState === item.href ? (i18n.language === 'en' ? "4px solid var(--color-primary)" : "0px solid var(--color-primary)") : "0px solid var(--color-primary)";
              e.currentTarget.style.borderRight = btnState === item.href ? (i18n.language === 'ar' ? "4px solid var(--color-primary)" : "0px solid var(--color-primary)") : "0px solid var(--color-primary)";
            }}
            key={item.id}
            titleIcon={item.title}
            hrefIcon={item.href}
            clickIcon={() => setBtnState(item.href)}
            classIcon={open ? (btnState === item.href ? 'active open-icon-item icon-item' : 'open-icon-item icon-item') : 
              (btnState === item.href ? 'noOpen-icon-item icon-item active' : 'noOpen-icon-item icon-item')} // Updated logic
            icon={item.icon}
            open={open}
            spanVariants={spanVariants}
          />
        ))}
      </Box>
    </motion.div>
  );
}

export default Sidebar;