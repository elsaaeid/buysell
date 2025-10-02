import React, { useState } from "react";
import "./LanguageMenu.css";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import i18n from './i18n';
import unitedStates from "./assets/language-imgs/unitedStates.png";
import egyptStates from "./assets/language-imgs/egyptStates.png";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdArrowDropDown } from 'react-icons/md'; // Importing the arrow icon
import { motion } from "framer-motion";



const getLanguageName = (code) => {
  if (code === 'en') {
    return i18n.language === 'en' ? "En" : "إنجل..";
  } else if (code === 'ar') {
    return i18n.language === 'ar' ? "ع.." : "Ar";
  }
  return code; // Fallback in case of an unknown language code
};

const languages = [
  {
    id: 1,
    code: 'en',
    name: getLanguageName('en'), // Dynamically get the name
    dir: 'ltr',
    icon: unitedStates,
  },
  {
    id: 2,
    code: 'ar',
    name: getLanguageName('ar'), // Dynamically get the name
    dir: 'rtl',
    icon: egyptStates,
  },
];

// Function to update language names when the language changes
const updateLanguageNames = () => {
  languages.forEach(lang => {
    lang.name = getLanguageName(lang.code);
  });
};

// Call this function whenever the language changes
i18n.on('languageChanged', updateLanguageNames);

const LanguageMenu = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor

  const chooseLanguage = (langValue) => {
    setSelectedLanguage(langValue);
    i18n.changeLanguage(langValue);

    // Set document direction and language attributes
    const selectedLang = languages.find(lang => lang.code === langValue);
    document.body.dir = selectedLang.dir;
    document.querySelector("html").lang = langValue;

    setAnchorEl(null); // Close menu after selection
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close menu
    setOpen(true);
  };

  return (
    <Box sx={{ width: 65 }} className="langs-select flex flex-row">
      <Box 
        onClick={handleClick} 
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '5px',
          borderRadius: '4px',
        }}
      >
        <img 
          src={languages.find(lang => lang.code === selectedLanguage).icon} 
          alt={`${selectedLanguage} icon`} 
          style={{ width: "20px", height: "20px", marginRight: "8px" }} 
        />
        {languages.find(lang => lang.code === selectedLanguage).name}
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
      >
        <MdArrowDropDown  />
      </motion.div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': {
            backgroundColor: colors.grey[900],
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem 
            key={language.code}
            onClick={() => {
              chooseLanguage(language.code);
              handleClose();
            }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "around-between",
              alignItems: "center",
              padding: "10px"
          }}
          >
            <img 
              src={language.icon} 
              alt={`${language.name} icon`} 
              style={{ width: "20px", height: "20px", marginRight: "8px" }} 
            />
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageMenu;