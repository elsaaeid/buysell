import React from 'react';
import {Box, Typography} from '@mui/material';


const Loader = () => {
  return (
    <Box className="loader-container">
      <center>
          <Typography variant="span" className="loader"></Typography>
      </center>
    </Box>
  )
}

export default Loader