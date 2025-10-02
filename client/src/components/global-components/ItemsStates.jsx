import React from 'react';
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import { t } from 'i18next';

const ItemsStates = ({numState, categoryState}) => {
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
        <Box 
            className="items-states w-full flex flex-row justify-around"
        >
            {(!categoryState || categoryState === "") ? (
                <span style={{ background: colors.grey[200] }} className="skeleton animate-pulse skeleton-item"></span>
            ) : (
                <span style={{ color: colors.grey[500] }}>{categoryState}</span>
            )}
            <Box className="count-content flex flex-row items-center justify-evenly">
                <span>{t("projectsNumber")}</span>
                {numState ? (
                    <span className="mx-3" style={{ color: colors.grey[500] }}>{numState}</span>
                ) : (
                    <span style={{ background: colors.grey[200] }} className="skeleton skeleton-num animate-pulse"></span>
                )}
            </Box>
        </Box>
  )
}

export default ItemsStates
