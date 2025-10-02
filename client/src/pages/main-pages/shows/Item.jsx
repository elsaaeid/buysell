import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';


const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/shows"
            relatedItems={relatedItems}
            relatedItem="Shows"
            RelatedItemPath="/show"
        />
    );
};

export default Item;