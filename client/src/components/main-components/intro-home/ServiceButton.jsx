import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";
import ServiceShowToggle from './ServiceShowToggle';
import { Context } from '../../../context/Context';
  
const ServiceButton = ({
    item
  }) => {

  // App Context
  const {
    handleCheckboxChange,
    selectedServices,
  } = useContext(Context);
  
  // Translation
	const { t } = useTranslation();


  // Add To Cart 
  const AddToCart = ()=>{
    handleCheckboxChange(item.id);
  }


  return (
    <Box className='show-service-icons w-full mt-3 flex flex-row justify-around items-initial'>
      <Box class="overlay p-3 flex flex-row items-center justify-between">
          <ServiceShowToggle 
            item={item}
          />
        <Link onClick={AddToCart} className='btn'>
        {selectedServices.includes(item.id) ? t("homeContainer.removeFromCart") : t("homeContainer.addToCart")}
        </Link>
      </Box>
    </Box>
  )
}

export default ServiceButton