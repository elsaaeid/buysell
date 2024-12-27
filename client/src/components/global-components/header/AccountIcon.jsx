import React, {useContext} from 'react';
import {Box} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { Context } from '../../../context/Context';



export const AccountIcon = ()=> {
  // show account menu
  const {showMenu, setShowMenu} = useContext(Context);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <PeopleIcon className="icon" onClick={handleClick} />
      </Box>
  )
}