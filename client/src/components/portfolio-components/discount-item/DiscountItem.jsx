import { t } from 'i18next';
import React from 'react';
import Col from 'react-bootstrap/Col';
import "./DiscountItem.css";
import { Link } from 'react-router-dom';

export const DiscountItem = ({item}) => {
  return (
    <Col 
        style={{
            backgroundColor: item.backgroundColor,
            borderRadius: '10px',
            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
        }}
        className='discount-item flex flex-col justify-center items-center'
        xs={4} sm={4} md={2} lg={2}>
        <span className='item-font text-black'>{item.title}</span>
        <img src={item.image} alt={item.title} />
        <Link to={item.href} className='linkHover mt-2'>{t("seeMore")}</Link>
    </Col>
  )
}
