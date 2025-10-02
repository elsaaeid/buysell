import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Spinner from "../Spinner";
import ItemsFilter from "../ItemsFilter";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ItemCard } from "../item-card/ItemCard";
import { useSelector } from "react-redux";
import { Context } from "../../../context/Context";
import ItemsStates from "../ItemsStates";


const ItemsContainer = ({
  items,
  selectFilteredItems,
  itemPath,
  search,
  setSearch,
}) => {

  // app context 
  const {
    categoryState,
    currentItems,
    numState,
    setCurrentItems,
    toggleItemTab,
    toggleTabForAll,
    orderTabState,
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
  } = useContext(Context);
  // Translation
  const { i18n } = useTranslation()
  
  const filteredItems = useSelector(selectFilteredItems);
  // open items Search
  const [openItemsSearch, setOpenItemsSearch] = useState(true);

  // direction of web page
  const [searchIconDir, setSearchIconDir] = useState(true);

  // open search
  const [searchOpen, setSearchOpen] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

// search change 
const SearchChange = (e)=> {
  setSearch(e.target.value);
 };

useEffect(()=>{
  if(search == "") {
    setOpenItemsSearch(true);
  }
  else {
    setOpenItemsSearch(false);
  }
}, [search]);


// direction of web page
useEffect(() => {
    if(document.body.dir === "ltr") {
        setSearchIconDir(true);
    }
    else if(document.body.dir === "rtl") {
        setSearchIconDir(false);
    }
}, [])

// Handel Close Search
const searchCloseHandle = ()=> {
    setSearch("");
    setOpenItemsSearch(true);
  };

const openSearch = ()=> {
    setSearchOpen(false)
    }
  const closeSearch = ()=> {
      setSearchOpen(true);
      setSearch("");
      setOpenItemsSearch(true);
  };



  const translatedCurrentItems = (currentItems || []).map(product => {
    if (i18n.language === 'ar') {
        return {
            _id: product._id,
            hasShow: product.hasShow,
            productType: product.productType,
            name: product.name_ar,
            image: product.image,
            productSlideImages: product.productSlideImages,
            category: product.category_ar,
            price: product.price,
            description: product.description_ar,
            model: product.model_ar,
            itemColor: product.itemColor,
        };
    }
    return product;
});
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ItemsFilter 
        orderTabState={orderTabState}
        toggleItemTab={toggleItemTab}
        toggleTabForAll={toggleTabForAll}
        open={open}
        rotate={rotate}
        showMore={showMore}
        hideMore={hideMore}
        showColorMore={showColorMore}
        hideColorMore={hideColorMore}
        openColor={openColor}
        rotateColor={rotateColor}
        openModel={openModel}
        rotateModel={rotateModel}
        showModelMore={showModelMore}
        hideModelMore={hideModelMore}
        items={items}
        searchOpen={searchOpen}
        SearchChange={SearchChange}
        search={search}
        searchCloseHandle={searchCloseHandle}
        openItemsSearch={openItemsSearch}
        searchIconDir={searchIconDir}
        openSearch={openSearch}
        closeSearch={closeSearch}
        colors={colors}
      />
      <div className="section-container mt-2 w-full flex flex-col justify-center items-center">
        {items.length === 0 ? (
          <Spinner />
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <ItemsStates numState={numState} categoryState={categoryState} />
            <Row className="w-full flex justify-center items-center mt-3">
              {translatedCurrentItems.map((item) => {
                const { _id, productType, name, category, model, itemColor, image, price} = item;
                return (
                  <Col 
                    key={_id}
                    xs={12} sm={12} md={12} lg={6} 
                    className={orderTabState ? "content-section active-content" : "content-section"}>
                    <ItemCard 
                        _id={_id}
                        productType={productType}
                        name={name}
                        category={category}
                        model={model}
                        itemColor={itemColor}
                        image={image}
                        price={price}
                        shortenText={shortenText}
                        detailsLink={`/${itemPath}/${_id}`}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </div>
  {/* pagination */}
     <ReactPaginate
          className={`pagination flex flex-row justify-around items-center`}
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="item activePage"
          previousLabel={<KeyboardArrowLeftIcon style={{ color: colors.grey[500], fontSize: 18, width: 50 }} />}
          nextLabel={<KeyboardArrowRightIcon style={{ color: colors.grey[500], fontSize: 18, width: 50 }} />}
          breakClassName={'item break-me'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={"item next"}
          pageClassName={'item pagination-page'}
          previousClassName={"item previous"}
        />
    </div>
  );
};

export default ItemsContainer;