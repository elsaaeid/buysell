import React from 'react';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

export const ColorBoxAll = ({
    itemColor,
    itemClass,
    itemClick,
}) => {
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
        <div 
            className={itemClass}
            onClick={itemClick}
            style={{
                color: colors.grey[500],
          }}>
                {itemColor}
        </div>
  )
}
