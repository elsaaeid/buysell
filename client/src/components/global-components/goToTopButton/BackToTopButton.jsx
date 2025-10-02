import React from "react";
import arrowToTop from "../../../assets/arrow_to_top.png"
import "./BackToTopButton.css";
import {Box} from '@mui/material';


const BackToTopButton = ({backToTop}) => {

    // Scroll To Top Of Window
    const goToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    } 
    
  return (
        <Box className="scroll-container">
        {backToTop && 
           <img src= {arrowToTop} alt='arrow_bottom' id="myBtn" title="Go to top" onClick={goToTop} />
        }
      </Box>
  );
};

export default BackToTopButton;
