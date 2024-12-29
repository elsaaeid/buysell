import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';



const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/schoolTools"
            relatedItems={relatedItems}
            relatedItem="SchoolTools"
            RelatedItemPath="/schoolTool"
        />
    );
};
export default Item;