import React from 'react';
import {Box, Typography} from '@mui/material';

export const IconComponent = ({styleIcon, clickIcon, icon}) => {
  return (
        <Box>
            <Typography variant="span" className="icon-item-q flex justify-center items-center" style={styleIcon} onClick={clickIcon}>
                  {icon}
            </Typography>
        </Box>
  )
}