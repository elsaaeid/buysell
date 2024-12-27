import React from 'react';
import './main.css';
import {Box} from '@mui/material';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import CarouselContainer from "./CarouselContainer";
import CTA from './CTA';



function Main() {
  // Theme Color Mode 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
      <main className="w-full flex justify-between items-center flex-row">
        <Box
            style={{
              background: colors.grey[900],
            }}
            className="intro h-full flex items-center">
              <CarouselContainer />
              <Box className="overlay">
              </Box>       
              <CTA />
          </Box>
      </main> 
            )
        }
export default Main;