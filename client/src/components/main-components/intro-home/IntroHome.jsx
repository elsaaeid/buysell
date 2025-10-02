import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import "./IntroHome.css"
import ServiceItem from './ServiceItem';
import { Context } from '../../../context/Context';


const IntroHome = () => {

  // App Context
  const { servicesItem } = useContext(Context);
  return (
    <Box className="intro-home w-full flex flex-col justify-center items-center">
      {
        servicesItem
        .map(
          (item, index) => 
        <Box key={index} className="Design-box-container w-full flex flex-col justify-center items-center">
          {
            (
              <>
              <ServiceItem
                item={item}
                />
              </>
            )
          }
        </Box>
         )
      }
    </Box>
  )
}

export default IntroHome