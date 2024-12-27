import React from 'react';
import {Box} from '@mui/material';
import { Bar } from './Bar';
import { MobileBar } from './MobileBar';



export const HeaderIcons = ({ 
    productsItems,
    toggleVariants,
    handleToggle,
})=> {
    
        return (
                <Box className='header__icons w-full flex justify-between items-center'>
                    <Bar productsItems={productsItems} />
                    {/* <MobileBar 
                        toggleVariants={toggleVariants}
                        handleToggle={handleToggle}
                    /> */}
                </Box>
            )
    }