import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { SearchContainer } from "../../components/global-components/search-container/SearchContainer";
import { RiSearchEyeLine } from "react-icons/ri";
import { VscSearch } from "react-icons/vsc";
import CategoryFilter from './category-filter/CategoryFilter';
import ItemColorFilter from './item-color-filter/ItemColorFilter';
import ModelFilter from './model-filter/ModelFilter';

const ItemsFilter = ({
    orderTabState,
    toggleItemTab,
    toggleTabForAll,
    open,
    rotate,
    showMore,
    hideMore,
    showColorMore,
    hideColorMore,
    openColor,
    rotateColor,
    openModel,
    rotateModel,
    showModelMore,
    hideModelMore,
    items,
    searchOpen,
    SearchChange,
    search,
    searchCloseHandle,
    openItemsSearch,
    searchIconDir,
    openSearch,
    closeSearch,
    colors,
}) => {
  return (
      <Box className="items-filter relative flex flex-row items-center justify-around">
        <ItemColorFilter
          orderTabState={orderTabState}
          showColorMore={showColorMore}
          hideColorMore={hideColorMore}
          toggleTabForAll={toggleTabForAll}
          openColor={openColor}
          rotateColor={rotateColor}
          items={items}
        />
        <CategoryFilter
          orderTabState={orderTabState}
          toggleItemTab={toggleItemTab}
          toggleTabForAll={toggleTabForAll}
          open={open}
          rotate={rotate}
          showMore={showMore}
          hideMore={hideMore}
          items={items}
        />
        <ModelFilter
          orderTabState={orderTabState}
          toggleItemTab={toggleItemTab}
          toggleTabForAll={toggleTabForAll}
          openModel={openModel}
          rotateModel={rotateModel}
          showModelMore={showModelMore}
          hideModelMore={hideModelMore}
          items={items}
        />
        <div className="search-section-container absolute flex flex-row items-center justify-center">
          <div className={searchOpen ? "search-section" : "search-section active"}>
            <SearchContainer
              SearchChange={SearchChange}
              SearchValue={search}
              searchCloseHandle={searchCloseHandle}
              openSearch={openItemsSearch}
              searchHeight="30px"
              searchIconTop="9px"
            />
          </div>
          <div className="search-icons-container cursor-pointer">
            { 
              searchOpen ? (
                <Tooltip title="open search">
                  <span onClick={openSearch} className="cursor-pointer">
                    {searchIconDir ? (
                      <RiSearchEyeLine 
                        style={{ color: colors.grey[100] }}
                        id="iconSearch" 
                        className="searchBtn icon-q" 
                        fontSize="small" 
                      />
                    ) : (
                      <VscSearch 
                        style={{ color: colors.grey[100] }}
                        id="iconSearch" 
                        className="searchBtn icon-q" 
                        fontSize="small" 
                      />
                    )}
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title="close search">
                  <span style={{ color: colors.grey[100] }} onClick={closeSearch}>x</span>
                </Tooltip>
              )
            }
          </div>
        </div>
      </Box>
  );
}

export default ItemsFilter;