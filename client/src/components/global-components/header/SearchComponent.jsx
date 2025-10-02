import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import {SearchContainer} from "../../global-components/search-container/SearchContainer";



const SearchComponent = ({ 
  searchItems,
  closeSearch, 
  searchVal,
  setSearchVal,
  openHeaderSearch,
  setOpenHeaderSearch,
  searchOpen,
}) => { 
 const [orderState, setOrderState] = useState("");
 // Theme Colors Mode
 const theme = useTheme();
 const colors = tokens(theme.palette.mode);


 // filtering For Search Items
 const filteredItems = searchItems.filter((item) => {
  if (searchVal == "") { 
    return null;
  }
  else if (item.name.toLowerCase().includes(searchVal.toLowerCase())) { 
    return item;
  }
  else {
    return null
    }
  });
 //Dropdown
const toggleTab = (order) => {
 setOrderState(order);
};

// search change
const SearchChange = (e)=> {
 setSearchVal(e.target.value);
}

useEffect(()=>{
  if(searchVal == "") {
    setOpenHeaderSearch(true);
  }
  else {
    setOpenHeaderSearch(false);
  }
}, [searchVal]);

  // searchCloseHandle
  const searchCloseHandle = ()=> {
    setSearchVal("");
    setOpenHeaderSearch(true);
  };

 return (
    <div>
        <div className='header-search h-full flex flex-row justify-center items-center'>
          <SearchContainer
            style={{
              color: colors.grey[900],
            }}
            SearchChange={SearchChange}
            SearchValue={searchVal}
            searchCloseHandle={searchCloseHandle}
            openSearch={openHeaderSearch}
            searchIconTop="16px"
          />
        <span
          style={{
            color: colors.grey[500],
            backgroundColor: colors.grey[900],
          }}
          className={searchOpen ? "closeBtn btn closeBtn-active" : "btn closeBtn"} 
          onClick={closeSearch} id="iconClose" title="close search">
          x
        </span>
        </div>
        <ul 
        className='search-results-list'
        style={{
            backgroundColor: colors.grey[900],
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "15px",
            position: "absolute",
            overflowY: "scroll",
            zIndex: "500",
        }}>
        {filteredItems.map((item) => (
          <li
            className={orderState === item.name ? "tabs-sections active-tabs-sections" : "tabs-sections"}
            onClick={closeSearch}
            key={item.id}>
          <Link 
            className='w-full h-full'
            onClick={() => toggleTab(item.name)}
            to={item.itemFiltered}
          >{item.name}</Link></li>
        ))}
      </ul>
    </div>
 );
};

export default SearchComponent;