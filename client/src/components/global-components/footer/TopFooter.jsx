import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import ActiveLink from '../../global-components/active-link/ActiveLink';
import Grid from '@mui/material/Grid';
import { Context } from "../../../context/Context.js";

const TopFooter = ({ items }) => {
  const { btnState, setBtnState } = useContext(Context);
  // Translation
  const { i18n } = useTranslation();

  const SideItem = items.map(item => {
    if (i18n.language === 'ar') {
      return {
        id: item.id,
        title: item.title_ar,
        href: item.href,
      };
    }
    return item;
  });

  return (
    <Grid className='row' container justifyContent="center" spacing={2}>
      {SideItem.map((item) => (
        <Grid item xs={6} sm={6} md={4} lg={4} key={item.id} className="mt-3"> {/* Added item prop and key */}
          <ActiveLink
            clickHandling={() => setBtnState(item.href)}
            classN={btnState === item.href ? 'active global-Link' : 'global-Link'}
            href={item.href}
            obj={item.title} 
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default TopFooter;