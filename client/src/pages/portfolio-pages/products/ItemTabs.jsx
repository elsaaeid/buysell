import React from 'react';



export const ItemTabs = ({itemClass,itemClick, itemTitle}) => {
  return (
        <li 
            className={itemClass}
            onClick={itemClick}>
            {itemTitle}
        </li>
  )
}

