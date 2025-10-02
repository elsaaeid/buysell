import React from 'react';
import Carousel from 'react-material-ui-carousel'
import '../../../pages/portfolio-pages/services/services.css';
import {BiCheck} from 'react-icons/bi';
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";


      

const checkIcon = <BiCheck className="service__list-icon" />;
const serviceDesc = (desc)=>{
    return(
        <li>
            {checkIcon}
            <p>{desc}</p>
        </li>
    )
}
function CarouselContainer()
{
          // Translation
const { i18n } = useTranslation();
  
    // Services Section Items
    var items = [
        {
            id: 1,
            name: "Web Development",
            name_ar: "تطوير الويب",
            desc1: serviceDesc("designing responsive and flexible websites with client side"),
            desc1_ar: serviceDesc("تصميم مواقع ويب سريعة الاستجابة ومرنة مع جانب العميل"),
            desc2: serviceDesc("developing websites with server side"),
            desc2_ar: serviceDesc("تطوير المواقع مع جانب الخادم"),
            desc3: serviceDesc("developing websites with Shopify"),
            desc3_ar: serviceDesc("تطوير المواقع باستخدام Shopify")
        },
        {
            id: 2,
            name: "GRAPHIC DESIGNING",
            name_ar: "تصميم الجرافيك",
            desc1: serviceDesc("logo, banner, products designer"),
            desc1_ar: serviceDesc("شعار، لافتة، مصمم المنتجات"),
            desc5: serviceDesc("Photographer, Video grapher"),
            desc5_ar: serviceDesc("مصور فوتوغرافي، مصور فيديو")
        },
        {
            id: 3,
            name: "UI/UX Design",
            name_ar: "تصميم واجهة المستخدم/تجربة المستخدم",
            desc1: serviceDesc("user interface, user experience on XAdobe"),
            desc1_ar: serviceDesc("واجهة المستخدم، تجربة المستخدم"),
        },
        {
            id: 4,
            name: "SEO optimization",
            name_ar: "تحسين محركات البحث",
            desc1: serviceDesc("Content Creation and Optimization"),
            desc1_ar: serviceDesc("إنشاء المحتوى وتحسينه"),
            desc2: serviceDesc("Technical Optimization"),
            desc2_ar: serviceDesc("التحسين الفني"),
            desc3: serviceDesc("On&Off-Page Optimization"),
            desc3_ar: serviceDesc("تحسين الصفحة وخارجها"),
            desc4: serviceDesc("Keyword Research"),
            desc4_ar: serviceDesc("البحث عن الكلمه الرئيسيه"),
        },
    ];
    const carouselItem = items.map(item => {
        if(i18n.language == 'ar') {
          return({
            id: item.id,
            name: item.name_ar,
            desc1: item.desc1_ar,
            desc2: item.desc2_ar,
            desc3: item.desc3_ar,
            desc4: item.desc4_ar,
            desc5: item.desc5_ar,
          })
        }
        return item;
      })
    
    return (
        <Carousel className="services__container">
            {
                carouselItem.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
export default CarouselContainer;

function Item(props)
{
    return (
    <article className="wow fadeInUp services" data-wow-iteration="1" data-wow-offset="80" data-wow-delay=".5s">
        <Box className="service__head">
            <h3>{props.item.name}</h3>
        </Box>
        <ul className="service__list">
            <li>
                <p>{props.item.desc1}</p>
            </li>
            <li>
                <p>{props.item.desc2}</p>
            </li>
            <li>
                <p>{props.item.desc3}</p>
            </li>
            <li>
                <p>{props.item.desc4}</p>
            </li>
            <li>
                <p>{props.item.desc5}</p>
            </li>
        </ul>
    </article>
    )
}