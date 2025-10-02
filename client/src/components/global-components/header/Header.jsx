import React, { useState } from "react";
import './header.css';
import { HeaderIcons } from './HeaderIcons';
import DropdownServices from "./DropdownProducts";
import { Box, Tooltip } from '@mui/material';
import LanguageMenu from '../../../translation/LanguageMenu';
import { motion } from "framer-motion";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next"; // Import useTranslation


const Header = ({productsItems, iconItem}) => {
  // Boolean States
  const [open, setOpen] = useState(false);
  const [toggleVariants, setToggleVariants] = useState(true);
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { i18n } = useTranslation(); // Get the i18n instance for language detection

  // For collapsing sidebar
  const handleToggle = () => {
    setOpen(!open);
    setToggleVariants(!toggleVariants);
  };

  // linksVariants 
  const linksVariants = {
    true: {
      display: 'flex',
      opacity: 1,
      borderRadius: '0px 0px 150px 150px',
      visibility: "visible",
      width: '50%',
      height: "",
      transition: 'opacity display height .7s ease-in-out',
    },
    false: {
      display: 'none',
      opacity: 0,
      visibility: "hidden",
      height: "0",
      transition: 'opacity display height .7s ease-in-out',
    }
  };

  return (
    <header
      style={{
        background: colors.grey[900],
      }}
      id="header"
      className="flex flex-col justify-between items-center"
    >
      <Box className='header__container flex flex-row justify-between items-center'>
        <HeaderIcons
          productsItems={productsItems}
          iconItem={iconItem}
          toggleVariants={toggleVariants}
          handleToggle={handleToggle} />
        {/* ======= menu ======= */}
        <motion.div
          initial={`${open}`}
          animate={`${open}`}
          variants={linksVariants}
          id="links"
          className="links"
          style={{
            background: colors.grey[900],
            position: 'absolute', // Ensure the links are positioned correctly
            left: i18n.language === 'ar' ? '0%' : 'auto', // Set left to 0% for English
            right: i18n.language === 'en' ? '0%' : 'auto', // Set right to 0% for Arabic
          }}
        >
          <Tooltip className="link">
            <div className="drop-down-menu">
              <LanguageMenu />
            </div>
          </Tooltip>
          <Tooltip title="Services">
            <div className="drop-down-menu">
              <DropdownServices productsItems={productsItems} />
            </div>
          </Tooltip>
        </motion.div>
      </Box>
    </header>
  )
};

export default Header;