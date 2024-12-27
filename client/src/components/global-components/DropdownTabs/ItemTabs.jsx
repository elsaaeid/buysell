import React from 'react';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";


export const ItemTabs = ({itemClass, itemClick, itemTitle}) => {
     // Theme Colors Mode
     const theme = useTheme()
     const colors = tokens(theme.palette.mode);
   
  return (
        <li 
            className={itemClass}
            onClick={itemClick}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: '1px solid #ccc',
              color: colors.grey[500],
          }}
            >
            {itemTitle}
        </li>
  )
}

