import React, { useContext } from 'react';
import {Box} from '@mui/material';
import {NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Context } from '../../../context/Context';


const CTA = ()=>{
    // App Context
    const { btnState, btnHandling, joinState } = useContext(Context);
    // Translation
	const { t } = useTranslation();
    return (
        <Box className='cta flex flex-row justify-evenly items-center'>
            {
                joinState &&
                <NavLink to="/register" 
                    underline="none"
                    className={btnState === "thertlyActive" ? "btnX btn-active" : "btnX"}
                    onClick={() =>btnHandling("thertlyActive")}
                    >{t("homeContainer.btnLeft")}</NavLink>
            }

            <NavLink to="/products" 
                underline="none"
                className={btnState === "thertlyActive" ? "btn btn-active" : "btn"}
                onClick={() =>btnHandling("thertlyActive")}
                >{t("homeContainer.btnRight")}</NavLink>
        </Box>
    )
};
export default CTA;

