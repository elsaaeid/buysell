import React, { useEffect } from "react";
import ServiceButton from './ServiceButton';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material"; 
import Box from '@mui/material/Box';
import WOW from 'wowjs';


const ServiceItem = ({
    item,
})=>{
  
  // Theme Color Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const wowRef = React.useRef(null); // Create a ref for WOW.js
  // Initialize WOW.js
   useEffect(() => {
      if (typeof MutationObserver !== 'undefined') {
          wowRef.current = new WOW.WOW();
          wowRef.current.init(); // Initialize WOW.js
      } else {
          console.warn('MutationObserver is not supported in this browser.');
      }
   }, []);
    return(
        <div id={item.id} className="Design-box-content wow fadeInUp front-card w-full item-property flex flex-col about__cards justify-center items-center">
        <Box class="overlay p-3 flex flex-col items-center width-full">
            <h4 
            style={{
              color: colors.grey[500],
              }}
            className="text-role mb-5">{item.name}</h4>
            <div className="flex flex-col justify-between items-center w-full">
              <div className="design w-full">{item.design}</div>
              <p 
               style={{
                color: colors.grey[500],
                }}
              className="design-para">{item.paragraph}</p>
            </div>
        </Box>
        <ServiceButton 
            item={item}
        />
      </div> 
    )
}
export default ServiceItem;