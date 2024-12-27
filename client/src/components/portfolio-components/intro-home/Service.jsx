import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CheckBoxItem from './CheckBoxItem';
import Typography from '@mui/material/Typography';
import "./IntroHome.css"
import { useTranslation } from "react-i18next";
import items from "./cardServices";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material"; 
import {useParams} from "react-router-dom";


const Service = () => {

// Translation
const { i18n } = useTranslation();
// Theme Colors Mode
const theme = useTheme();
const colors = tokens(theme.palette.mode);
// secondary State
const [secondary, setSecondaryState] = useState(false);
const {id} = useParams();

// services Items
const servicesItems = items.map(item => {
  if(i18n.language == 'ar') {
    return({
      id: item.id,
      checkTitle: item.checkTitle_ar,
      primaryItem: item.primaryItem_ar,
      secondaryItem: item.secondaryItem_ar,
      primaryItem2: item.primaryItem2_ar,
      secondaryItem2: item.secondaryItem2_ar,
      primaryItem3: item.primaryItem3_ar,
      secondaryItem3: item.secondaryItem3_ar,
      primaryItem4: item.primaryItem4_ar,
      secondaryItem4: item.secondaryItem4_ar,
      primaryItem5: item.primaryItem5_ar,
      secondaryItem5: item.secondaryItem5_ar,
      primaryItem6: item.primaryItem6_ar,
      secondaryItem6: item.secondaryItem6_ar,
      primaryItem7: item.primaryItem7_ar,
      secondaryItem7: item.secondaryItem7_ar,
      primaryItem8: item.primaryItem8_ar,
      secondaryItem8: item.secondaryItem8_ar,
      itemIcon1: item.itemIcon1,
      itemIcon2: item.itemIcon2,
      itemIcon3: item.itemIcon3, 
      itemIcon4: item.itemIcon4,
      itemIcon5: item.itemIcon5,
      itemIcon6: item.itemIcon6, 
      itemIcon7: item.itemIcon7,
      itemIcon8: item.itemIcon8,
      reMaintenanceService: item.reMaintenanceService_ar,
      acceptService: item.acceptService_ar,
    })
  }
  return item;
});

  return (
      <Box className="service-home flex flex-col justify-center items-center">
      {servicesItems
        .filter((item) => item.id === id)
        .map((item) => (
          <Box
            className='w-full mb-5 flex flex-col justify-center items-center'>
              <Box 
                className= 'w-full desc-content item-property'
                sx={{ padding: 5, overflow: "hidden" }}>
                <Typography 
                style={{
                  color: colors.grey[100],
                  }}
                  className="check-title" 
                  variant="h6">
                  {item.checkTitle}
                </Typography>
                <Grid container>
                <CheckBoxItem 
                  item={item}
                  secondary={secondary}
                  setSecondaryState={setSecondaryState}
                  items={items}
                  primaryItem={item.primaryItem}
                  secondaryItem={item.secondaryItem}
                  primaryItem2= {item.primaryItem2}
                  secondaryItem2 = {item.secondaryItem2}
                  primaryItem3= {item.primaryItem3}
                  secondaryItem3 = {item.secondaryItem3}
                  primaryItem4= {item.primaryItem4}
                  secondaryItem4 = {item.secondaryItem4}
                  primaryItem5={item.primaryItem5}
                  secondaryItem5={item.secondaryItem5}
                  primaryItem6={item.primaryItem6}
                  secondaryItem6={item.secondaryItem6}
                  primaryItem7={item.primaryItem7}
                  secondaryItem7={item.secondaryItem7}
                  primaryItem8={item.primaryItem8}
                  secondaryItem8={item.secondaryItem8}
                  itemIcon1={item.itemIcon1}
                  itemIcon2={item.itemIcon2}
                  itemIcon3={item.itemIcon3}
                  itemIcon4={item.itemIcon4}
                  itemIcon5={item.itemIcon5}
                  itemIcon6={item.itemIcon6}
                  itemIcon7={item.itemIcon7}
                  itemIcon8={item.itemIcon8}
                  />
                </Grid>
              </Box>
          </Box>
        ))}
      </Box>
  )
}

export default Service