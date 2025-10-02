import React, { useState, useEffect } from 'react';
import { tokens } from "../../../theme";
import { Box, useTheme } from '@mui/material';
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import CommentSection from '../comment-section/CommentSection';
import { useSelector } from 'react-redux';
import "./ItemCardDetails.css";
import {Link} from "react-router-dom";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MdClose } from 'react-icons/md';
import RelatedItems from '../related-items/RelatedItems';
import { StarRating } from '../star-rating/StarRating';
import { CartProductManagement } from '../cart-product-management/CartProductManagement';



const ItemCardDetails = ({ item, itemPath, relatedItems, RelatedItemPath, relatedItem }) => {

    // State to manage the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    // main image state
    const [mainImage, setMainImage] = useState('');
    // showing of main image state
    const [isFullScreen, setIsFullScreen] = useState(false);
    const { user } = useSelector(
        (state) => state.auth
    );
    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // Translation
    const { t, i18n } = useTranslation(); // Initialize translation function

    useEffect(() => {
        setMainImage(item.image);
    }, [item]);

    // console.log(item);

    // function to make slide image is main image
    const handleImageClick = (image) => {
        setMainImage(image);
    };

    //  function to show main image
    const handleMainImageClick = () => {
        setIsFullScreen(true);
    };

    // function to close slide image
    const handleClose = () => {
        setIsFullScreen(false);
    };

    useEffect(() => {
        if (Array.isArray(item.productSlideImages) && item.productSlideImages.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % item.productSlideImages.length);
            }, 3000); // Change slide every 3 seconds
            // Cleanup function to clear the interval
            return () => clearInterval(interval);
        }
        // If no images, do not set interval
        return undefined;
    }, [item.productSlideImages]);




    return (
        <Box className="flex flex-col justify-center items-center w-full relative">
            <Box className="flex justify-start items-center w-full">
                <Link
                    to={itemPath}
                    underline="none"
                    className="btn m-2"
                >
            {i18n.language === 'en' ?  <IoMdArrowBack className="cursor-pointer" /> 
            : <IoMdArrowForward className="cursor-pointer" />}
            </Link>
            </Box>
            <Box className="section__item-attachments w-full flex justify-around items-center">
                <Box className="item-image flex flex-col justify-center items-center">
                    {mainImage && (
                        <img
                            src={mainImage.filePath}
                            alt={mainImage.fileName}
                            className="w-full h-auto cursor-pointer" // Add cursor pointer for better UX
                            onClick={handleMainImageClick} // Click to open full screen
                        />
                    )}
                    <Carousel
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        emulateTouch={true}
                        swipeable={true}
                        dynamicHeight={false}
                        centerMode={true}
                        centerSlidePercentage={25} // Adjust this to show 4 images
                        useKeyboardArrows={true}
                        selectedItem={currentIndex} // Set the current slide
                        className="mt-2" // Add margin to separate from the main image
                    >
                        {Array.isArray(item.productSlideImages) && item.productSlideImages.slice(0, 4).map((image, index) => (
                            <div className='cursor-pointer p-1 border-2 hover:border-gray-300' key={index} onClick={() => handleImageClick(image)}>
                                <img src={image.filePath} alt={image.fileName} className="w-full h-auto" />
                            </div>
                        ))}
                    </Carousel>

                    {/* Full-Screen Modal */}
                    {isFullScreen && (
                        <div 
                            style={{
                                zIndex: 300,
                            }}
                            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                            <img
                                src={mainImage.filePath}
                                alt={mainImage.fileName}
                                className="full-image max-w-full max-h-full cursor-pointer"
                                onClick={handleClose}
                            />
                            <button
                                onClick={handleClose}
                                className="close-icon text-2xl cursor-pointer"
                                style={{
                                    color: "white",
                                    zIndex: 300,
                                }}>
                                <MdClose />
                            </button>
                        </div>
                    )}
                </Box>
                <Box className="item-details flex flex-col justify-center items-center">
                    <Box className="p-2 w-full section__item-title flex flex-row justify-between items-center">
                        {item?.name && 
                        <>
                            <span className='item-font'>
                                {t("item.name")}:
                            </span>
                            <h4 className='item-title item-font'>{i18n.language === 'en' ? item.name : item.name_ar}</h4>
                        </>
                        }
                    </Box>
                    <Box className="p-2 w-full flex flex-row justify-between items-center">
                        {item?.model && (
                        <>
                            <span
                            className='item-font'
                            >
                                {t("item.model")}:
                            </span>
                            <span className='item-font'>{i18n.language === 'en' ? item.model : item.model_ar}</span>
                        </>
                        )}
                    </Box>
                    <Box className="p-2 w-full flex flex-row justify-between items-center">
                        {item?.itemColor && (
                            <>
                            <span
                                className='item-font'>
                                {t("item.color")}:
                            </span>
                            <span 
                                style={{
                                    display: "block",
                                    background: item.itemColor,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                }}></span>
                            </>
                        )}
                    </Box>
                    <StarRating 
                        item={item}
                        user={user}
                    />
                    <Box className="p-2 w-full flex flex-row justify-between items-center">
                    {item?.category && (
                        <>
                            <span 
                                className='item-font'
                                style={{
                                    borderBottom: `1px solid ${colors.grey[500]}`,
                                }}
                            >{t("category")}
                            </span>
                            <span className='item-font'
                                style={{
                                    borderBottom: `1px dashed ${colors.grey[500]}`,
                                }}
                                >{i18n.language === 'en' ? item.category : item.category_ar}
                            </span>
                        </>
                        )}
                    </Box>
                    <Box className="p-2 w-full flex flex-row justify-between items-center">
                        {item?.description && (
                        <>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(i18n.language === 'en' ? item.description : item.description_ar),
                                }}
                            />
                        </>
                        )}
                    </Box>
                    <CartProductManagement
                        _id={item._id}
                        productType={item.productType}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        image={item.image}
                        cartIconClass={"details-cart-icon-handle"}
                        buttonClass={"details-cart-button"}
                    />
                </Box>
            </Box>
            <Box className="w-full flex flex-row justify-evenly items-center">
                <CommentSection user={user} item={item} colors={colors} />
            </Box>
            <RelatedItems 
                relatedItems={relatedItems} 
                RelatedItemPath={RelatedItemPath} 
                relatedItem={relatedItem} 
            />
        </Box>
    );
};

export default ItemCardDetails;