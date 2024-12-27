import React, { useContext } from 'react';
import bottomItems from "./bottomItems";
import ActiveLink from '../../global-components/active-link/ActiveLink';
import Grid from '@mui/material/Grid';
import { Context } from "../../../context/Context.js";
import '../../global-components/active-link/ActiveLink.css';

const BottomFooter = () => {
  const { btnState, setBtnState } = useContext(Context);
  
  return (
    <Grid className="row" container justifyContent="center" spacing={4}>
      {bottomItems.map((item) => (
        <Grid 
          item // Added item prop here
          xs={6} 
          sm={6} 
          md={4} 
          lg={4} 
          key={item.id} // Moved key prop to the correct position
          className="footer__socials_icons mt-5 flex flex-row justify-center items-center"
        >
          <ActiveLink
            clickHandling={() => setBtnState(item.href)}
            classN={btnState === item.href ? 'active global-Link' : 'global-Link'}
            href={item.href}
            obj={item.icon} 
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default BottomFooter;