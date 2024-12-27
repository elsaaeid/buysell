import React from 'react';
import { DiscountItem } from '../discount-item/DiscountItem';
import { discountItems } from '../data/discountItems';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';



export const DiscountContainer = () => {
    // Translation
    const { i18n } = useTranslation();

    const items = discountItems.map(item => {
        if (i18n.language === 'ar') {
            return {
                id: item.id,
                title: item.title_ar,
                image: item.image,
                backgroundColor: item.backgroundColor,
            };
        }
        return item;
    });

    return (
        <div id='discounts' className="w-full flex flex-col justify-center items-center">
            <h2 className="text-center text-2x font-bold m-3">{i18n.t('discount.title')}</h2>
            <Row className="w-full flex justify-around items-center">
                {
                    items.map((item) => (
                        <DiscountItem key={item.id} item={item} />
                    ))
                }
            </Row>
        </div>
    );
};