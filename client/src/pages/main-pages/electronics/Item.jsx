import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';



const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/electronics"
            relatedItems={relatedItems}
            relatedItem="Electronics"
            RelatedItemPath="/electronic"
        />
    );
};

export default Item;