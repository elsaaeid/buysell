import { IoIosArrowUp } from "react-icons/io";
import React, { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";
import "./ColorOptions.css";
import { ColorBoxAll } from "./ColorBoxAll";

const ColorOptions = ({ 
    items, 
    orderTabState, 
    toggleTabForAll, 
    results, 
    showColorMore,
    hideColorMore,
    openColor,
    rotateColor,
 }) => {
  
  // Translation
  const { t } = useTranslation();

  const parentRef = useRef();
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);


  return (
    <Box ref={parentRef} className='color-options flex flex-col justify-evenly items-center'>
      <Box
        className="flex justify-evenly items-center"  
        variant="success" 
        id="dropdown-basic" 
        onClick={showColorMore}>
        {t('dropdown.selectColor')} 
        <IoIosArrowUp 
        className={rotateColor ? "arrowExplore" : "arrowExplore toggled"} />
      </Box>         
      <ul
        className={openColor ? "dropdown-color flex flex-col justify-center items-center" : "dropdown-color flex flex-col justify-center items-center dropdown-toggled"}>       
        <ColorBoxAll 
          itemClass={orderTabState === t("all") ? "dropdown-color-tabs dropdown-active-color-tabs" : "dropdown-color-tabs"}
          itemClick={() => {
            toggleTabForAll(t("all"), items.length, t("all"), items);
            hideColorMore(); // Call hideColorMore when this tab is clicked
          }}
          itemColor={t("all")}
        />
        {results}
      </ul>
    </Box>
  );
};

export default ColorOptions;