import React, { useState, useEffect } from "react";
import { SearchContainer } from "./search-container/SearchContainer";


const SearchBlogs= ({setSearch, search})=>{
      // open blog Search
  const [openBlogSearch, setOpenBlogSearch] = useState(true);
// search change 
const SearchChange = (e)=> {
    setSearch(e.target.value);
   };
  
  useEffect(()=>{
    if(search == "") {
      setOpenBlogSearch(true);
    }
    else {
      setOpenBlogSearch(false);
    }
  }, [search]);
  
  // Handel Close Search
  const searchCloseHandle = ()=> {
      setSearch("");
      setOpenBlogSearch(true);
    };
  
    return(
          <SearchContainer
            position='unset'
            SearchChange={SearchChange}
            SearchValue={search}
            searchCloseHandle={searchCloseHandle}
            openSearch={openBlogSearch}
            searchIcon="searchIconBlog"
            searchContent="searchContentBlog"
            />
    )
}
export default SearchBlogs;