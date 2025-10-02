import React from 'react';
import { PromotionsItem } from '../promotions-item/PromotionsItem';
import {promotionsItems} from '../data/promotionsItems';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';


export const PromotionsContainer = () => {
    // Translation
    const { i18n } = useTranslation();

    const items = promotionsItems.map(item => {
        if (i18n.language === 'ar') {
            return {
                id: item.id,
                title: item.title_ar,
                desc: item.desc_ar,
                backgroundColor: item.backgroundColor,
                image: item.image,
            };
        }
        return item;
    });
  return (
        <div id='promotions' className="w-full flex flex-col justify-center items-center">
            <h2 className="text-2 font-bold m-3 text-center">{i18n.t('promotions.title')}</h2>
            <Row className="w-full flex justify-around items-center">
                {
                    items.map((item) => (
                        <PromotionsItem key={item.id} item={item} />
                    ))
                }
            </Row>
        </div>
  )
}
