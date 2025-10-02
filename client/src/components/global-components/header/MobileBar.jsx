import React, {useState, useEffect} from 'react';
import {Box, Tooltip, IconButton} from '@mui/material';
import {AccountMenu} from "./AccountMenu";
import "./header.css"
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";
import HeaderSearch from './HeaderSearch';
import { CartIcon } from "./CartIcon";
import {NotificationMenu} from "./NotificationMenu";
import {IconComponent} from './IconComponent';        
import { ThemeModeIcon } from '../ThemeModeIcon';  
import { ShowOnLogin } from "../../../protect/HiddenLink";




export const MobileBar =({
    toggleVariants,
    handleToggle,
})=>{
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // searchIcon Direction
    const [searchIconDir, setSearchIconDir] = useState(true);
    // searchOpen States
    const [searchOpen, setSearchOpen] = useState(false);
    // openHeaderSearch States
    const [openHeaderSearch, setOpenHeaderSearch] = useState(true);
    // searchVal Values
    const [searchVal, setSearchVal] = useState("");

    // searchIcon Direction Side Effect
    useEffect(() => {
        if(document.body.dir === "ltr") {
            setSearchIconDir(true);
        }
        else if(document.body.dir === "rtl") {
            setSearchIconDir(false);
        }
    }, [])

    // openSearch Function
    const openSearch = ()=> {
        setSearchOpen(true)
    }
    // closeSearch Function
    const closeSearch = ()=> {
        setSearchOpen(false);
        setSearchVal("");
        setOpenHeaderSearch(true);
    }
    return(
        <Box className="mobile-bar w-full flex flex-row justify-around items-center">
            <CartIcon />
            <Box className="flex flex-row justify-content-center items-center">
                <ThemeModeIcon />
                <ShowOnLogin>
                    <NotificationMenu />
                </ShowOnLogin>
            </Box>
            <HeaderSearch 
                searchIconDir={searchIconDir} 
                searchVal={searchVal}
                searchOpen={searchOpen}
                openSearch={openSearch}
                closeSearch={closeSearch}
                openHeaderSearch={openHeaderSearch}
                setSearchVal={setSearchVal}
                setOpenHeaderSearch={setOpenHeaderSearch}
                />
            <AccountMenu />
            <Box   
                onClick={handleToggle}          
                className='toggle cursor-pointer'>
            {
                toggleVariants
                ?
                <Tooltip title="Open menu">
                    <IconButton>
                        <IconComponent        
                        icon={<FaBarsStaggered style={{
                            color: colors.grey[500],
                            }} />} 
                        />
                    </IconButton>
                </Tooltip>
                :
                <Tooltip title="Close menu">
                    <IconButton>
                        <IconComponent        
                        icon={<AiOutlineCloseCircle style={{
                            color: colors.grey[500],
                            }} />} 
                        />
                    </IconButton>
                </Tooltip>
            }
            </Box>
        </Box>
    )
}