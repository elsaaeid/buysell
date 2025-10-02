import React from "react";
import DropdownTabs from "./DropdownTabs/DropdownTabs";
import {ItemTabs} from "./DropdownTabs/ItemTabs";



const PortfolioCategoryFilter = ({orderState, toggleTab, products})=>{
  // print items of Dropdown
  const categories = products.reduce((acc, {category}) => {
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc; 
  }, 
  []).map((category) =>
      {
        // print count of products by category
        let counter = 0;
        let filteredCategory = [];
        for (let i = 0; i < products.length; i++) {
          if (products[i].category.includes(category)) counter++;
        }
        // filter items by category
        filteredCategory = products.filter((i) => {
          if(i.category.includes(category)) {
            return products;
          }
        });

        return(
        <>
        {
          category ?
          <ItemTabs 
          itemClass={orderState == category ? "dropdown-tabs dropdown-active-tabs" : "dropdown-tabs"}
          itemClick={() =>toggleTab(category , counter, category, filteredCategory)}
          itemTitle={category}
          />
          :
          null
        }
        </>
      )}
      );
      
    return(
      <DropdownTabs 
        orderState={orderState} 
        toggleTab={toggleTab} 
        items={products} 
        value="category" 
        results={categories} />
    )
}
export default PortfolioCategoryFilter;