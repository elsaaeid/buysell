import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

export default function Spinner() {
    // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress style={{
        color: colors.grey[500]
      }} size={20} />
    </Box>
  );
}