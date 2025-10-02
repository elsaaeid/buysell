import React from "react";
import DropdownTabs from "../DropdownTabs/DropdownTabs";
import { ItemTabs } from "../DropdownTabs/ItemTabs";
import i18n from 'i18next'; // Ensure you import i18n if you're using it for language checks

const CategoryFilter = ({ 
  orderTabState, 
  toggleItemTab, 
  toggleTabForAll,
  items, 
  showMore,
  hideMore,
  open,
  rotate,
 }) => {
  // Extract unique categories from items
  const categories = items.reduce((acc, { category, category_ar }) => {
    if (!acc.some(cat => cat.en === category)) {
      acc.push({ 
        en: category, 
        ar: category_ar // Assuming each item has a category_ar property
      });
    }
    return acc;
  }, []);

  return (
    <DropdownTabs 
      orderTabState={orderTabState} 
      toggleTabForAll={toggleTabForAll}
      selectItem={i18n.language === 'en' ? "Category" : "الفئة"} // Adjust the label based on the current language
      showMore={showMore}
      hideMore={hideMore}
      open={open}
      rotate={rotate}
      items={items} 
      results={categories.map(({ en, ar }) => {
        // Count items by category
        const counter = items.filter(item => item.category === en).length;

        // Filter items by category
        const filteredCategory = items.filter(item => item.category === en);

        // Determine the category title based on the current language
        const categoryTitle = i18n.language === 'en' ? en : ar;

        return (
          categoryTitle ? (
            <ItemTabs 
              key={en} // Use the English category as the key
              itemClass={orderTabState === en ? "dropdown-tabs dropdown-active-tabs" : "dropdown-tabs"}
              itemClick={() => {
                toggleItemTab(en, ar, counter, categoryTitle, filteredCategory);
                hideMore(); // Call hideMore when this tab is clicked
              }}
              itemTitle={categoryTitle}
            />
          ) : null
        );
      })} 
    />
  );
};

export default CategoryFilter;