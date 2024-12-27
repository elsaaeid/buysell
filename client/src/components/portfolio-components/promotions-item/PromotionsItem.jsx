import { t } from 'i18next';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Col from 'react-bootstrap/Col';
import "./PromotionsItem.css";
import { Link } from 'react-router-dom';

export const PromotionsItem = ({item}) => {
  return (
    <Col 
        style={{
            borderRadius: '10px',
            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
        }}
        className='promotion-item relative flex flex-col justify-center items-center'
        xs={2} sm={2} md={2} lg={2}>
        <Box className="image-box absolute h-full w-full">
            <img src={item.image} alt={item.alt} />
        </Box>
        <Box className="overlay-box absolute h-full w-full"
            style={{
                backgroundColor: item.backgroundColor,
            }}
        ></Box> 
        <Box className="details-box absolute h-full w-full flex flex-col justify-evenly items-center">
            <Typography className='text-black' variant="h5">{item.title}</Typography>
            <Typography className='text-black' variant="body1">{item.desc}</Typography>
            <Link to={item.href} className='linkHover mt-2'>{t("seeMore")}</Link>
        </Box>
    </Col>
  )
}
