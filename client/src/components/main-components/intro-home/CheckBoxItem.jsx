import React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import "./IntroHome.css";
import FormGroupItem from "./FormGroupItem";
import ServiceShowToggle from "./ServiceShowToggle";

  const ListItem = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))


const CheckBoxItem = (
  {
  item,
  secondary,
  setSecondaryState,
  itemIcon1,
  itemIcon2,
  itemIcon3,
  itemIcon4,
  itemIcon5,
  itemIcon6,
  itemIcon7,
  itemIcon8,
  primaryItem, 
  secondaryItem, 
  primaryItem2, 
  secondaryItem2, 
  primaryItem3, 
  secondaryItem3,
  primaryItem4, 
  secondaryItem4,
  primaryItem5, 
  secondaryItem5,
  primaryItem6, 
  secondaryItem6,
  primaryItem7, 
  secondaryItem7,
  primaryItem8, 
  secondaryItem8,
}
) => {

  return (
        <Grid className="w-full">
          <Box className="flex flex-row items-center justify-between w-full">
            <FormGroup className="m-3" row>
              <FormGroupItem
              secondary={secondary}
              setSecondaryState={setSecondaryState}
              />
            </FormGroup>
            <ServiceShowToggle 
                item={item}
              />
          </Box>
          <Grid className="w-full">
              <List className="m-auto w-full flex flex-col">
                <Box className="box-items w-full flex justify-center items-center">
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                      {itemIcon1}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className="service-item-text w-full p-3 flex flex-col justify-center items-center"
                      primary={primaryItem}
                      secondary={secondary ? secondaryItem : null}
                    />
                  </ListItem>
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon2}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem2}
                      secondary={secondary ? secondaryItem2 : null}
                    />
                  </ListItem>
                </Box>
                <Box className="box-items w-full flex justify-center items-center">
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon3}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem3}
                      secondary={secondary ? secondaryItem3 : null}
                    />
                  </ListItem>
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon4}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem4}
                      secondary={secondary ? secondaryItem4 : null}
                    />
                  </ListItem>
                </Box>
                <Box className="box-items w-full flex justify-center items-center">
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon5}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem5}
                      secondary={secondary ? secondaryItem5 : null}
                    />
                  </ListItem>
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon6}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem6}
                      secondary={secondary ? secondaryItem6 : null}
                    />
                  </ListItem>
                </Box>
                <Box className="box-items w-full flex justify-center items-center">
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items- divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    <ListItemIcon className="w-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon7}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem7}
                      secondary={secondary ? secondaryItem7 : null}
                    />
                  </ListItem>
                  <ListItem className="service-item-box m-3 w-full flex flex-col justify-center items-center divide-solid border-slate-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <ListItemIcon className="width-full flex flex-col justify-center items-center">
                    <span className="flex justify-content-center items-center w-40 h-40">
                    {itemIcon8}
                    </span>
                    </ListItemIcon>
                    <ListItemText
                      className='service-item-text w-full p-3 flex flex-col justify-center items-center'
                      primary={primaryItem8}
                      secondary={secondary ? secondaryItem8 : null}
                    />
                  </ListItem>
                </Box>
              </List>
          </Grid>
        </Grid>
  )
}

export default CheckBoxItem
