import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SideIcons = ({ titleIcon, hrefIcon, clickIcon, classIcon, icon, spanVariants, open, styleIcon }) => {
  
  return (
      <Link 
        className={`sideLink ${classIcon}`}
        to={hrefIcon} 
        underline="none" 
        onClick={clickIcon}
        style={styleIcon} // Directly use styleIcon here
      >
        <span>
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
  );
}

export default SideIcons;