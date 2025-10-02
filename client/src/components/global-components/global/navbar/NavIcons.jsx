import React from 'react';
import {Tooltip} from '@mui/material';
import {Link} from "react-router-dom"
import { tokens } from "../../../../theme";
import {useTheme} from '@mui/material';
import {motion} from "framer-motion";

               
const NavIcons = ({ titleIcon, hrefIcon, clickIcon, classIcon, icon, spanVariants, open }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Tooltip title={titleIcon}>
      <Link 
        style={{
          color: colors.grey[500],
        }}
        className='navLink' 
        to={hrefIcon} 
        underline="none" 
        onClick={clickIcon}
      >
        <span className={classIcon}>
          {icon}
        </span>
        <motion.span 
          initial={open.toString()} // Convert boolean to string
          animate={open.toString()} // Convert boolean to string
          variants={spanVariants} 
          className="mt-1"
        >
          {titleIcon}
        </motion.span>
      </Link>
    </Tooltip>
  );
}

export default NavIcons;