import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import {RiSearchEyeLine} from "react-icons/ri";
import {VscSearch} from "react-icons/vsc";
import SearchContent from "./SearchContent";
import { tokens } from "../../../theme";
import {IconComponent} from './IconComponent';

const HeaderSearch = ({
    searchIconDir,
    searchVal,
    setSearchVal,
    searchOpen,
    openSearch,
    closeSearch,
    openHeaderSearch,
    setOpenHeaderSearch
})=>{
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box>
            <Tooltip title="Search icon">
                <IconButton>
                    <IconComponent        
                    icon={searchIconDir
                        ? 
                    <RiSearchEyeLine 
                    style={{
                        color: colors.grey[500],
                        }}
                    id="iconSearch" onClick={openSearch} className="searchBtn cursor-pointer icon-q" fontSize="small" />
                        : 
                    <VscSearch 
                    style={{
                        color: colors.grey[500],
                        }}
                    id="iconSearch" onClick={openSearch} className="searchBtn cursor-pointer icon-q" fontSize="small" />
                    } />
                </IconButton>
            </Tooltip>
            <div className={searchOpen ? "searchBox-active searchBox" : "searchBox"} title="search"> 
                <SearchContent 
                    searchVal={searchVal} 
                    setSearchVal={setSearchVal} 
                    closeSearch={closeSearch}  
                    searchOpen={searchOpen}
                    openHeaderSearch={openHeaderSearch}
                    setOpenHeaderSearch={setOpenHeaderSearch}
                />
            </div>
        </Box>
    )
}
export default HeaderSearch;