import React, { useEffect } from 'react';
import contactItems from "./contactItems";
import { Box, Link } from '@mui/material';
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import WOW from 'wowjs';

const ContactOption = (
) => {
  const wowRef = React.useRef(null); // Create a ref for WOW.js
     // Theme Colors Mode
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
    // Translation
    const { t, i18n } = useTranslation();
    const Items = contactItems.map(item => {
        if(i18n.language === 'ar') {
        return({
          id: item.id,
          icon: item.icon,
          title: item.title_ar,
          sub_title: item.sub_title,
          contact_option: item.contact_option,
        })
        }
        return item;
        })

  // Initialize WOW.js
    useEffect(() => {
      if (typeof MutationObserver !== 'undefined') {
          wowRef.current = new WOW.WOW();
          wowRef.current.init(); // Initialize WOW.js
      } else {
          console.warn('MutationObserver is not supported in this browser.');
      }
    }, []);
  return (
      <Box className="contact__options">
      {Items
        .map((item) => (
            <article 
              style={{
                background: colors.grey[900],
              }}
              className="contact__option mt-2 wow fadeInUp">
                <span
                  style={{
                    color: colors.grey[500],
                  }}
                >
                  {item.icon}
                </span>
                <h4
                  style={{
                    color: colors.grey[500],
                  }}
                >{item.title}</h4>
                <h3
                  style={{
                    color: colors.grey[500],
                  }}
                >{item.sub_title}</h3>
                <Link
                  href={item.contact_option} 
                  target="_blank">{t("contact.sendMessage")}</Link>
            </article>
        ))}
      </Box>
  )
}

export default ContactOption