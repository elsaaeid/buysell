import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';


const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/clothes"
            relatedItems={relatedItems}
            relatedItem="Clothes"
            RelatedItemPath="/clothe"
        />
    );
};

export default Item;