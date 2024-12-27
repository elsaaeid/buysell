import React, {useContext} from 'react';
import { IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { tokens } from "../../theme";



export const ThemeModeIcon = () => {

  // App Context
  const colorMode = useContext(ColorModeContext);
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
        
  return (
        <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-haspopup="true"
         onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon 
             style={{
                    color: colors.grey[900],
                  }}
            />
          ) : (
            <LightModeOutlinedIcon
             style={{
                    color: colors.grey[900],
                  }}
            />
          )}
        </IconButton>
  )
}
