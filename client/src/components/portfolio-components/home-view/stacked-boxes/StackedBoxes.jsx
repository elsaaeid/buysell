import React, {useEffect } from 'react';
import './StackedBoxes.css'; // Import the CSS file for styling
import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";
import BoxItem from './BoxItem';
import items from "./items";
import WOW from 'wowjs';

const StackedBoxes = () => {
  const wowRef = React.useRef(null); // Create a ref for WOW.js
  const handleBoxHover = (e) => {
    // Increase z-index on hover
    e.target.style.zindex = 4;
  };

  const handleBoxLeave = (e) => {
    // Reset z-index on leave
    e.target.style.zindex = e.target.getAttribute('data-zindex');
  };
    // Translation
    const { i18n } = useTranslation();
    const boxItems = items.map(item => {
      if(i18n.language == 'ar') {
        return({
          id: item.id,
          title: item.title_ar,
          path: item.path,
          box: item.box,
          indexNum: item.indexNum,
        })
      }
      return item;
    });

   // Initialize WOW.js
   useEffect(() => {
    if (typeof MutationObserver !== 'undefined') {
        wowRef.current = new WOW.WOW();
        wowRef.current.init(); // Initialize WOW.js
    } else {
        console.warn('MutationObserver is not supported in this browser.');
    }
}, []);
  return (
    <Box className="stacked-boxes-container wow fadeInUp flex justify-center items-center w-full">
      {boxItems.map((item, index) => (
            <BoxItem 
              key={index}
              path={item.path}
              indexNum={item.indexNum}
              handleBoxHover={handleBoxHover}
              handleBoxLeave={handleBoxLeave}
              box={item.box}
              title={item.title}
            />
          )
        )}
    </Box>
  );
};

export default StackedBoxes;
