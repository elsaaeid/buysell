import React from "react";
import DropdownTabs from "../DropdownTabs/DropdownTabs";
import { ItemTabs } from "../DropdownTabs/ItemTabs";
import { useTranslation } from "react-i18next";

const ModelFilter = ({ 
  orderTabState, 
  toggleItemTab, 
  toggleTabForAll,
  items, 
  showModelMore,
  hideModelMore,
  openModel,
  rotateModel,
 }) => {
  // Translation
  const { t, i18n } = useTranslation();
  // Extract unique categories from items
  const models = items.reduce((acc, { model, model_ar }) => {
    if (!acc.some(cat => cat.en === model)) {
      acc.push({ 
        en: model, 
        ar: model_ar // Assuming each item has a model_ar property
      });
    }
    return acc;
  }, []);

  return (
    <DropdownTabs 
      orderTabState={orderTabState} 
      toggleTabForAll={toggleTabForAll} 
      showMore={showModelMore}
      hideMore={hideModelMore}
      open={openModel}
      rotate={rotateModel}
      items={items}
      selectItem={t('dropdown.model')} 
      results={models.map(({ en, ar }) => {
        // Count items by model
        const counter = items.filter(item => item.model === en).length;

        // Filter items by model
        const filteredModel = items.filter(item => item.model === en);

        // Determine the model title based on the current language
        const modelTitle = i18n.language === 'en' ? en : ar;

        return (
          modelTitle ? (
            <ItemTabs 
              key={en} // Use the English model as the key
              itemClass={orderTabState === en ? "dropdown-tabs dropdown-active-tabs" : "dropdown-tabs"}
              itemClick={() => {
                toggleItemTab(en, ar, counter, modelTitle, filteredModel);
                hideModelMore(); // Call hideModelMore when this tab is clicked
              }}
              itemTitle={modelTitle}
            />
          ) : null
        );
      })} 
    />
  );
};

export default ModelFilter;