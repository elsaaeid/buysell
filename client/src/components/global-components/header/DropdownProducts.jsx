import React, { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";
import shortenText from "../shortenText";
import ActiveLink from "../active-link/ActiveLink";
import { Context } from "../../../context/Context";
import Menu from '@mui/material/Menu';
import { MdArrowDropDown } from 'react-icons/md'; // Importing the arrow icon
import { motion } from "framer-motion";




const DropdownProducts = ({productsItems}) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor
  //App Context
  const { btnState, setBtnState} = useContext(Context);

  // Translation
  const { t, i18n } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close menu
    setOpen(true);
  };


    // product Items


    const productItems = productsItems.map(item => {
    if(i18n.language === 'ar') {
    return({
      id: item.id,
      name: item.name_ar,
      link: item.link,
    })
    }
    return item;
    });


    // Function to handle scrolling to section
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
  return (
    <Box sx={{ width: 65 }} className="products-select flex flex-row">
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
        {t("products.title")}
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
        <MdArrowDropDown />
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
        {productItems.map((item, index)=>{
          const sectionId = item.link.split('#')[1];
          return(
            <MenuItem key={index}
              onClick={handleClose}
              style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px"
              }}
              value={item.name}>
              <ActiveLink
                clickHandling={() => {
                  setBtnState(item.link);
                  scrollToSection(sectionId);
                }}
                classN={btnState === item.link ? 'active global-Link' : 'global-Link'}
                href={item.link}
                obj={shortenText(item.name, 16)} />
            </MenuItem>
              )
          })}
      </Menu>
    </Box>
  );
};

export default DropdownProducts;