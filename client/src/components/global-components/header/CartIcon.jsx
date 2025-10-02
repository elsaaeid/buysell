import React, { useContext } from 'react';
import { IconButton, Tooltip, Badge } from '@mui/material';
import { IconComponent } from './IconComponent';
import { TbShoppingCartCog } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Context } from '../../../context/Context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";



export const CartIcon = () => {
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setShowCart } = useContext(Context);

  // Get the quantity from the Redux store
  const quantity = useSelector((state) => state.cart.items.length); // Assuming items is an array in your cart state

  const toggleCart = () => {
    setShowCart(true);
  };

  const themeColor = createTheme({
    palette: {
      primary: {
        main: '#ffa500'
      }
    }
  });
  return (
      <Tooltip title="Cart">
          <IconButton
            onClick={toggleCart}
            sx={{ ml: 2 }}
          >
          <ThemeProvider theme={themeColor}>
              <Badge 
                  color="primary"
                  style={{
                  }}
                  badgeContent={quantity}
                  overlap="circular"
                  >
                  <TbShoppingCartCog
                  style={{
                    color: colors.grey[500],
                  }}
                    className="icon" fontSize="small" />
              </Badge>
          </ThemeProvider>
          </IconButton>
      </Tooltip>
  );
};
