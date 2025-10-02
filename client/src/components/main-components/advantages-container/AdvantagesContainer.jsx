import React, { useEffect, useState } from 'react';
import {advantagesIcons} from '../data/advantagesIcons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';
import { useTranslation } from "react-i18next"; 
import "./AdvantagesContainer.css";

export const AdvantagesContainer = () => {
    // State to manage the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Translation
    const { i18n, t } = useTranslation();

    const items = advantagesIcons.map(item => {
        if (i18n.language === 'ar') {
            return {
                id: item.id,
                title: item.title_ar,
                icon: item.icon,
                backgroundColor: item.backgroundColor,
            };
        }
        return item;
    });
    

    useEffect(() => {
        // Set interval for automatic slide transition
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
        }, 3000); // Change slide every 3 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [items.length]);
    
    
  return (
    <Box className="advantages-container w-full flex flex-col justify-center items-center">
        <h2 className='text-center text-2x font-bold m-3'>
            {t("advantages.title")}
        </h2>
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
            className="w-full" // Add margin to separate from the main image
        >
            {items.map((item) => (
                <Box 
                    className="w-full flex flex-col justify-center items-center"
                    key={item.id}>
                    <span
                        style={{
                            backgroundColor: item.backgroundColor,
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >{item.icon}</span>
                    <span className='item-font'>{item.title}</span>
                </Box>
            ))}
        </Carousel>
    </Box>
  )
}
