import React, {  useRef, useEffect } from 'react';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import {Box} from '@mui/material';
import { IoCloseSharp } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { useTranslation } from 'react-i18next';


export const SearchContainer = ({
  SearchChange, 
  SearchValue, 
  searchCloseHandle,
  openSearch,
  searchHeight,
  searchIconTop,
}) => {
  // Theme Colors Mode
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
	// Translation
  const { i18n } = useTranslation();
  
  // Current Input Reference
  const inputRef = useRef(null);
 
useEffect(() => {
  inputRef.current.focus();
}, []);

  return (
    <Box className='flex width-full justify-center search-input'>
        <Box className='search-content'>
          <input
            style={{
              position: 'absolute',
              color: colors.grey[500],
              backgroundColor: colors.grey[900],
              width: "100%",
              height: searchHeight,
            }}
            id="search-input"
            placeholder=''
            onChange={SearchChange}
            value={SearchValue}
            type="search" 
            ref={inputRef}
            />
            {
              openSearch ? <GoSearch style={{
                color: colors.grey[500],
                top: searchIconTop,
                right: i18n.language === 'en' ? "5%" : "85%",
              }}
               id='search-icon' />
               : 
              <IoCloseSharp 
              style={{
                color: colors.grey[500],
                top: searchIconTop,
                right: i18n.language === 'en' ? "5%" : "85%",
              }} id='search-icon' onClick={searchCloseHandle} />
            }
        </Box>
    </Box>
  )
}
