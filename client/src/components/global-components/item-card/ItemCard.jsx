import React, { useContext } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme";
import { CartProductManagement } from '../cart-product-management/CartProductManagement';
import { Context } from '../../../context/Context';


export const ItemCard = ({ 
    _id,
    image, 
    productType,
    name, 
    category,
    model,
    itemColor,
    price,
    shortenText,
    detailsLink,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();

    const { btnHandling } = useContext(Context);

    return (
        <Box className="item-card">
            <article className='relative section__item flex flex-col justify-between items-center mt-3'>
                <Box className="w-full section__item-image flex justify-center items-center">
                    {image ? (
                        <img
                            src={image.filePath}
                            alt={image.fileName}
                        />
                    ) : null}
                </Box>
                <Box className="mt-2 w-full section__item-attachments flex flex-row justify-between items-center">
                    {model && (
                        <span
                            style={{
                                display: "block",
                                background: colors.grey[700],
                                padding: "3px",
                                borderRadius: "7px",
                                fontSize: "10px"
                            }}
                            >{model}</span>
                    )}
                    {itemColor && (
                        <span 
                            style={{
                                display: "block",
                                background: itemColor,
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                            }}
                        ></span>
                    )}
                </Box>
                <Box className="section__item-details">
                    {name ? (
                        <Typography style={{ fontSize: '15px' }} variant='h6'>
                            {shortenText(name, 16)}
                        </Typography>
                    ) : null}
                </Box>
                <Box className="section_item-bottom flex flex-row justify-evenly items-center w-full">
                    <span>
                        {price ? `${price}$` : null}
                    </span>
                    <CartProductManagement
                        _id={_id}
                        productType={productType}
                        name={name}
                        category={category}
                        price={price}
                        image={image}
                        cartIconClass={"cart-icon-handle"}
                        buttonClass={"btn"}
                    />
                </Box>
                <Box className="mt-2 w-full flex flex-col justify-center items-center">
                    <Box className="section__item-cta">
                        <NavLink 
                            to={detailsLink}
                            underline="none"
                            className="btnX"
                            onClick={() => btnHandling("thertlyActive")}>
                            {t("moreLink")}
                        </NavLink>
                    </Box>
                    {category ? (
                        <Box 
                            className="category-content mt-3 w-full flex flex-row justify-between items-center"
                            style={{ color: colors.grey[500] }}
                        >
                            <p className="found">{t("category")}</p>
                            <p 
                                style={{ borderBottom: `1px dashed ${colors.grey[500]}` }}
                                className="category"
                            >
                                {category}
                            </p>
                        </Box>
                    ) : null}
                </Box>
            </article>
        </Box>
    );
};

export default ItemCard;