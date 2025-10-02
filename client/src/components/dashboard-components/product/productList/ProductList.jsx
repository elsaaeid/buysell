import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useTranslation } from "react-i18next";
import TableItemsContainer from "../../table-items-container/TableItemsContainer";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import ItemsFilter from "../../../global-components/ItemsFilter";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../../redux/features/product/filterSlice";
import {
  CALC_CATEGORY,
} from "../../../../redux/features/product/productSlice";



const ProductList = ({ 
  products, 
  confirmDelete,
}) => {
    // app context 
    const {
      categoryState,
      currentItems,
      orderTabState,
      numState,
      setCurrentItems,
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
    } = useContext(Context);
  // Translation
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  // open items Search
  const [openItemsSearch, setOpenItemsSearch] = useState(true);
  // direction of web page
  const [searchIconDir, setSearchIconDir] = useState(true);

  // open search
  const [searchOpen, setSearchOpen] = useState(true);

  const filteredProducts = useSelector(selectFilteredProducts);
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // A hook to access the redux dispatch function
  const dispatch = useDispatch();

// calculate products
useEffect(() => {
  dispatch(CALC_CATEGORY(products));
}, [dispatch, products]);

  // Begin Pagination
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;


  // filtering Products And Set Current Items
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    // Ensure currentItems reflects all products if pagination is not desired
    const paginatedItems = filteredProducts.slice(itemOffset, endOffset);
    setCurrentItems(paginatedItems);

    // Log the lengths for debugging
    console.log("Filtered Products Length:", filteredProducts.length);
    console.log("Current Items Length:", paginatedItems.length);

    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  // Products Filtering Side Effect
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);


// search change 
const SearchChange = (e)=> {
  setSearch(e.target.value);
 };


 // Set Search Value = ""
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

    // openSearch Handling
    const openSearch = ()=> {
      setSearchOpen(false)
    }
    // closeSearch Handling
    const closeSearch = ()=> {
        setSearchOpen(true);
        setSearch("");
        setOpenItemsSearch(true);
    }

    console.log("products in product list:", products);

  return (
    <div className="product-list">
      <hr />
      <div className="w-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-between my-3">
            <h3 style={{
              color: colors.grey[500],
            }}>
              {t("dashboard.productList.inventoryItems")}
            </h3>
        </div>
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
          items={products}
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
        <Box className="projects-number flex flex-row justify-between items-center">
            <span>{categoryState}</span>
            <p><span>{t("dashboard.productList.projectsNumber")}</span> <span>{numState}</span></p>
        </Box> 
        <Box className="table-container w-full">
            <TableItemsContainer item="edit-clothes" products={products} pageCount={pageCount} handlePageClick={handlePageClick} confirmDelete={confirmDelete} currentItems={currentItems} />
        </Box>
      </div>
    </div>
  );
};

export default ProductList;
