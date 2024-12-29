import React from 'react';
import ItemCardDetails from '../../../components/global-components/item-card-details/ItemCardDetails';



const Item = ({ item, relatedItems }) => {

    return (
        <ItemCardDetails 
            item={item}
            itemPath="/health-beauties"
            relatedItems={relatedItems}
            relatedItem="HealthBeauty"
            RelatedItemPath="/health-beauty"
        />
    );
};
export default Item;