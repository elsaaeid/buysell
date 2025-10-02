import React from "react";
import SearchComponent from './SearchComponent';
import { useTranslation } from "react-i18next";



const SearchContent = ({
  searchVal,
  searchOpen,
  setSearchVal,
  openHeaderSearch,
  setOpenHeaderSearch,
  closeSearch,
}) => {
  
  const items = [
    {
    id: 1,
    name: "electronics",
    name_ar: "إلكترونيات",
    itemFiltered: "/electronics",
    },
    {
    id: 2,
    name: "school tools",
    name_ar: "الأدوات المدرسية",
    itemFiltered: "/schoolTools",
    },
    {
    id: 3,
    name: "housewares",
    name_ar: "ادوات منزلية",
    itemFiltered: "/housewares",
    },
   {
  id: 4,
    name: "health & beauty",
    name_ar: "الصحة والجمال",
    itemFiltered: "/healthBeauties",
  },
    {
    id: 5,
    name: "clothes",
    name_ar: "ملابس",
    itemFiltered: "/clothes",
  },
    {
    id: 6,
    name: "products",
    name_ar: "المنتجات",
    itemFiltered: "/products",
  },
   {
  id: 7,
    name: "shows",
    name_ar: "العروض",
    itemFiltered: "/shows",
  },
   {
  id: 8,
    name: "discounts",
    name_ar: "خصومات",
    itemFiltered: "/#discounts",
  },
    {
    id: 9,
    name: "promotions",
    name_ar: "الترقيات",
    itemFiltered: "/#promotions",
  },
];

     // Translation
     const { i18n } = useTranslation();

     // Search Items
     const searchItems = items.map(item => {
      if(i18n.language === 'ar') {
      return({
        id: item.id,
        name: item.name_ar,
        itemFiltered: item.itemFiltered,
      })
      }
      return item;
      })
    
  return (
        <SearchComponent
          searchOpen={searchOpen}
          searchVal={searchVal} 
          setSearchVal={setSearchVal}
          searchItems={searchItems} 
          openHeaderSearch={openHeaderSearch}
          setOpenHeaderSearch={setOpenHeaderSearch}
          closeSearch={closeSearch}
        />
  );
};

export default SearchContent;