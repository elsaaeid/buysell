import React, {useContext} from 'react';
import { IconButton, useTheme, Tooltip } from "@mui/material";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { tokens } from "../../theme";
import { t } from 'i18next';



export const ThemeModeIcon = () => 
{

    // App Context
    const colorMode = useContext(ColorModeContext);
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
         
  return (
      <Tooltip title={t("toggleMode")} placement="bottom" arrow>
          <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-haspopup="true"
          onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon 
              style={{
                      color: colors.grey[500],
                    }}
              />
            ) : (
              <LightModeOutlinedIcon
              style={{
                      color: colors.grey[500],
                    }}
              />
            )}
          </IconButton>
      </Tooltip>
  )
}
