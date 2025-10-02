import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle }) => {

  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        className="w-full flex flex-start"
        variant="h4"
        color={colors.grey[500]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.grey[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
