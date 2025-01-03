import { IoIosArrowUp } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Box } from '@mui/material';
import { ItemTabs } from "./ItemTabs";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import "./DropdownTabs.css";

const DropdownTabs = ({ 
  items, 
  orderTabState, 
  toggleItemTab, 
  results, 
  open, 
  rotate, 
  showMore, 
  hideMore,
  selectItem,
 }) => {
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Translation
  const { t } = useTranslation();

  const parentRef = useRef();
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);


  return (
    <Box ref={parentRef} className='block-tabs flex flex-col justify-evenly items-center'>
      <Box
        className="flex justify-evenly items-center"  
        variant="success" 
        id="dropdown-basic" 
        onClick={showMore}>
          {selectItem}
        <IoIosArrowUp 
        className={rotate ? "arrowExplore" : "arrowExplore toggled"} />
      </Box>         
      <ul 
        style={{
          background: colors.grey[900],
        }} 
        className={open ? "dropdown-menus flex flex-col justify-center items-center" : "dropdown-menus flex flex-col justify-center items-center dropdown-toggled"}>       
        <ItemTabs 
          itemClass={orderTabState === t("all") ? "dropdown-tabs dropdown-active-tabs" : "dropdown-tabs"}
          itemClick={() => {
            toggleItemTab(t("all"), items.length, t("all"), items);
            hideMore(); // Call hideMore when this tab is clicked
          }}
          itemTitle={t("all")}
        />
        {results}
      </ul>
    </Box>
  );
};

export default DropdownTabs;