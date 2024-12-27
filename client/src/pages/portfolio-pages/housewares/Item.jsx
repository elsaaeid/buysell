import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';


const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/housewares"
            relatedItems={relatedItems}
            relatedItem="Housewares"
            RelatedItemPath="/houseware"
        />
    );
};
export default Item;