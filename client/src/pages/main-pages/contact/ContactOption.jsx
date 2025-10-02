import React from 'react';
import contactItems from "./contactItems";
import { Box, Link } from '@mui/material';
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

const ContactOption = (
) => {
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
        });
  return (
      <Box className="contact__options">
      {Items
        .map((item, index) => (
            <article 
              key={index}
              style={{
                background: colors.grey[900],
              }}
              className="contact__option mt-2">
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