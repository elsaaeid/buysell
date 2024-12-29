import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';



const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/products"
            relatedItems={relatedItems}
            relatedItem="Products"
            RelatedItemPath="/product"
        />
    );
};

export default Item;