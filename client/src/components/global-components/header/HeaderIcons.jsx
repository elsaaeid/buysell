import React from 'react';
import {Box} from '@mui/material';
import { Bar } from './Bar';



export const HeaderIcons = ({ 
    productsItems,
    iconItem,
})=> {
    
        return (
                <Box className='header__icons w-full flex justify-between items-center'>
                    <Bar productsItems={productsItems} iconItem={iconItem} />
                    {/* <MobileBar 
                        toggleVariants={toggleVariants}
                        handleToggle={handleToggle}
                    /> */}
                </Box>
            )
    }