import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTranslation } from "react-i18next";
import './main.css';
import { mainItems } from '../data/mainItems';


function CarouselContainer() {
    // State to manage the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Translation
    const { i18n } = useTranslation();

    const carouselItems = mainItems.map(item => {
        return i18n.language === 'ar' ? {
            id: item.id,
            headTitle: item.headTitle_ar,
            image: item.image,
        } : item;
    });

    useEffect(() => {
        // Set interval for automatic slide transition
        const interval = setInterval(() => {
            // Determine the direction based on the current language
            const nextIndex = i18n.language === 'ar' 
                ? (currentIndex + 1 + carouselItems.length) % carouselItems.length // Move left for Arabic
                : (currentIndex - 1) % carouselItems.length; // Move right for English

            setCurrentIndex(nextIndex);
        }, 3000); // Change slide every 3 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [currentIndex, carouselItems.length, i18n.language]); // Add i18n.language to dependencies

    return (
        <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            emulateTouch={true}
            swipeable={true}
            dynamicHeight={false}
            centerMode={true}
            useKeyboardArrows={true}
            selectedItem={currentIndex} // Set the current slide
            className='main-carousel h-full w-full flex flex-col justify-center items-center'>
            {
                carouselItems.map((item) => <Item key={item.id} item={item} />)
            }
        </Carousel>
    );
}

export default CarouselContainer;

function Item(props) {
    return (
        <article className="main__card flex flex-col justify-center items-center">
            <p className='item-font z-10'>{props.item.headTitle}</p>
            <span style={{
                width: "400px"
            }}>{props.item.image}</span>
        </article>
    );
}