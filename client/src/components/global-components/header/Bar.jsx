import React, { useState, useEffect } from 'react';
import DropdownProducts from "./DropdownProducts";
import {NotificationMenu} from "./NotificationMenu";
import LanguageMenu from '../../../translation/LanguageMenu';      
import { ShowOnLogin } from "../../../protect/HiddenLink";
import HeaderSearch from './HeaderSearch';
import { CartIcon } from "./CartIcon";
import LogoContent from '../LogoContent.jsx';
import { ThemeModeIcon } from '../ThemeModeIcon.jsx';




export const Bar = ({productsItems, iconItem})=>{
    // search Icon Direction State
    const [searchIconDir, setSearchIconDir] = useState(true);
    // Search Open State
    const [searchOpen, setSearchOpen] = useState(false);
    // open Header Search state
    const [openHeaderSearch, setOpenHeaderSearch] = useState(true);
    // search Value State
    const [searchVal, setSearchVal] = useState("");

    // search Icon Direction Side Effect
    useEffect(() => {
        if(document.body.dir === "ltr") {
            setSearchIconDir(true);
        }
        else if(document.body.dir === "rtl") {
            setSearchIconDir(false);
        }
    }, []);

    // open Search Function
    const openSearch = ()=> {
    setSearchOpen(true)
    };
    // close Search Function
    const closeSearch = ()=> {
        setSearchOpen(false);
        setSearchVal("");
        setOpenHeaderSearch(true);
    }
    return(
        <div className="flex basic-menu flex-row justify-evenly items-center w-full">
            <LogoContent />
            <div className="drop-down-menu mr-2">
                <LanguageMenu />
            </div>
            <div className="drop-down-menu">
                <DropdownProducts productsItems={productsItems} />
            </div>
            <CartIcon />
            <ShowOnLogin>
                <NotificationMenu />
            </ShowOnLogin>
            <ThemeModeIcon />
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
                {iconItem}
        </div>
    )
}