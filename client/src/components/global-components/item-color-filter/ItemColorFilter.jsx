import React from "react";
import ColorOptions from "../color-options/ColorOptions";
import { ColorBox } from "../color-options/ColorBox";

const ItemColorFilter = ({ 
    orderTabState, 
    toggleTabForAll, 
    toggleItemTab,
    items, 
    showColorMore,
    hideColorMore,
    openColor,
    rotateColor,
 }) => {
  // Extract unique colors from items
  const colors = items.reduce((acc, { itemColor }) => {
    if (!acc.includes(itemColor)) {
      acc.push(itemColor);
    }
    return acc;
  }, []);

  return (
    <ColorOptions 
      orderTabState={orderTabState} 
      toggleTabForAll={toggleTabForAll} 
      showColorMore={showColorMore}
      hideColorMore={hideColorMore}
      openColor={openColor}
      rotateColor={rotateColor}
      items={items} 
      results={colors.map((itemColor) => {
        // Count items by itemColor
        const counter = items.filter(item => item.itemColor === itemColor).length;

        // Filter items by itemColor
        const filteredItemColor = items.filter(item => item.itemColor === itemColor);

        return (
          itemColor ? (
            <ColorBox 
              key={itemColor} // Added key for list rendering
              itemClass={orderTabState === itemColor ? "mt-1 dropdown-color-tabs dropdown-active-color-tabs" : "mt-1 dropdown-color-tabs"}
              itemClick={() => {
                toggleItemTab(itemColor, counter, itemColor, filteredItemColor);
                hideColorMore(); // Call hideColorMore when this tab is clicked
              }}
              itemColor={itemColor}
            />
          ) : null
        );
      })} 
    />
  );
};

export default ItemColorFilter;
