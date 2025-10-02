import { Box, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { RxArrowRight } from "react-icons/rx";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import "./RelatedItems.css";
import { Context } from '../../../context/Context';
import { t } from 'i18next';

function RelatedItems({ relatedItems, RelatedItemPath, relatedItem }) {
    // State to manage the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Set interval for automatic slide transition
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % relatedItems.length);
        }, 3000); // Change slide every 3 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [relatedItems.length]);
    return (
        <Box className="mt-1 related-items-container w-full flex flex-col justify-center items-center">
            {relatedItems.length !== 0 ? (
                <Box className="carousel-related-items">
                    <h3 className="section__title mb-2 p-3">{t(`related${relatedItem}`)}</h3>
                    <Carousel 
                        selectedItem={currentIndex}
                        className='flex flex-col justify-center items-center'>
                        {relatedItems.map((item, i) => <Item key={i} RelatedItemPath={RelatedItemPath} item={item} />)}
                    </Carousel>
                </Box>
            ) : null}
        </Box>
    );
}

export default RelatedItems;

function Item(props) {
    const { shortenText } = useContext(Context);
    const { i18n } = useContext(Context); // Ensure you have access to i18n context

    return (
        <article className="related-item flex flex-col justify-center items-center">
            <span className='item-image'>
                {props.item?.image && (
                    <img
                        src={props.item.image.filePath}
                        alt={props.item.image.fileName}
                        className="responsive-image" // Add a class for responsive images
                    />
                )}
            </span>
            <Box className="flex flex-row justify-between items-center w-full">
                <NavLink 
                    to={`${props.RelatedItemPath}/${props.item._id}`}
                    underline="none" 
                    className="read-more flex flex-row">
                    <span>
                        {t("readMore")}
                    </span>
                    <Box className='flex flex-row'>
                        <span className='ArrowForward'>
                            <MdArrowForwardIos 
                                style={{
                                    transform: i18n.language === 'en' ? "rotate(0deg)" : "rotate(180deg)" // Adjust rotation based on language
                                }} 
                                fontSize="18" 
                            />
                        </span>
                        <span className='ArrowRight hidden'>
                            <RxArrowRight 
                                style={{
                                    transform: i18n.language === 'en' ? "rotate(0deg)" : "rotate(180deg)" // Adjust rotation based on language
                                }} 
                                fontSize="23" 
                            />
                        </span>
                    </Box>
                </NavLink>
                <h3>
                    {props.item?.name ? (
                        <Typography variant='h6' className="item-title">
                            {props.item && <h4 className='item-title'>{i18n.language === 'en' ? shortenText(props.item.name, 16) : shortenText(props.item.name_ar, 16)}</h4>}
                        </Typography>
                    ) : null}
                </h3>
            </Box>
        </article>
    );
}