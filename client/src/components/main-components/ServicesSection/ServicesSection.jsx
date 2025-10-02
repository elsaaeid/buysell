import React, { useEffect } from 'react';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import DrawIcon from '@mui/icons-material/Draw';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { useTranslation } from "react-i18next";
import { Box } from '@mui/material';
import "./ServicesSection.css";
import { NavLink } from 'react-router-dom';
import WOW from 'wowjs';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FcServices } from 'react-icons/fc';



function ServicesSection() {
    const wowRef = React.useRef(null); // Create a ref for WOW.js
    // Translation
    const { i18n } = useTranslation();
  
    // About Section Items
    const items = [
        {
            id: 1,
            icon: <DeveloperModeIcon />,
            name: "User-Interface and dashboard for cPanel",
            name_ar: "واجهة المستخدم ولوحة التحكم لـ cPanel",
            link: "/services#SoftwareEngineering",
        },
        {
            id: 2,
            icon: <DrawIcon />,
            name: "Creative designing and ideas out of box",
            name_ar: "تصميم وأفكار إبداعية خارج الصندوق",
            link: "/services#graphicDesigning",
        },
        {
            id: 3,
            icon: <AddAPhotoIcon />,
            name: "High quality for your brand product",
            name_ar: "جودة عالية لمنتج علامتك التجارية",
            link: "/services#productsPhotography",
        },
        {
            id: 4,
            icon: <AdsClickIcon />,
            name: "Content creation and digital marketing",
            name_ar: "إنشاء المحتوى والتسويق الرقمي",
            link: "/services#SponsoredAds",
        }
    ];

    const servicesItem = items.map(item => {
        if (i18n.language === 'ar') {
            return {
                id: item.id,
                name: item.name_ar,
                link: item.link,
                icon: item.icon,
            };
        }
        return item;
    });

    // Initialize WOW.js
     useEffect(() => {
        if (typeof MutationObserver !== 'undefined') {
            wowRef.current = new WOW.WOW();
            wowRef.current.init(); // Initialize WOW.js
        } else {
            console.warn('MutationObserver is not supported in this browser.');
        }
     }, []);

    return (
        <Box className="flex flex-col justify-around items-center">
            <Box className='branch-container'>
				<FcServices className='icon-branch' />
			</Box>
            <h2 className="servicesSection__title">{i18n.t('homeContainer.services.title')}</h2>
            <p className="servicesSection__line">{i18n.t("homeContainer.services.desc")}</p>
            <Row className='servicesSection__container w-full my-3 flex justify-evenly items-center'>
                {
                    servicesItem.map((item, i) => <Item key={i} item={item} />)
                }
            </Row>
        </Box>
    );
}

export default ServicesSection;

function Item(props) {
    return (
        <Col xs={12} sm={6} md={6} lg={6} className="service__card my-2 wow fadeInUp" data-wow-duration="0.5s">
            <NavLink 
                className="flex p-2 flex-col justify-center items-center" 
                to={props.item.link}>
                <span className="service__icon">{props.item.icon}</span>
                <h3>{props.item.name}</h3>
            </NavLink>
        </Col>
    );
}