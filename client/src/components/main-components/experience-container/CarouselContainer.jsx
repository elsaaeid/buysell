import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";


function CarouselContainer()
{
      // Translation
const { i18n } = useTranslation();
    // Experience Section Items
    var items = [
        {
            id: 1,
            title: "Frontend Development",
            title_ar: "تطوير وجهات المسنخدم",
        },
        {
            id: 2,
            title: "Backend Development",
            title_ar: "تطوير وجهات السرفر",
        },
        {
            id: 3,
            title: "Graphic Designing",
            title_ar: "تصميم الجرافيك",
        },
    ]
    const carouselItem = items.map(item => {
        if(i18n.language == 'ar') {
          return({
            id: item.id,
            title: item.title_ar,
            component: item.component,
          })
        }
        return item;
      })
      
    return (
        <Carousel>
            {
                carouselItem.map( (item, id) => <Item key={id} item={item} /> )
            }
        </Carousel>
    )
}
export default CarouselContainer;

        
function Item(props)
{
    return (
        <Box className="experience-item flex justify-center items-center wow fadeInLeft" data-wow-iteration="1" data-wow-offset="80" data-wow-delay=".5s">
            <h2 className='font-bold'>{props.item.title}</h2>
        </Box>
    )
}