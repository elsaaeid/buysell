import React, { useState, useEffect } from 'react';
import './CookieConsent.css'; // Import your CSS for styling
import { Box } from "@mui/material";
import { useCookies } from 'react-cookie'; // Import useCookies from react-cookie
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const CookieConsent = () => {
    // Translation
    const { t } = useTranslation();
    const [cookies, setCookie] = useCookies(); // Initialize cookies
    const [isVisible, setIsVisible] = useState(true);


    useEffect(() => {
        // Check if cookies have already been accepted
        if (cookies.cookiesAccepted) {
            setIsVisible(false);
        }
    }, [cookies]);

    const handleAcceptCookies = () => {
        setCookie('cookiesAccepted', true, { path: '/' }); // Set cookie to indicate acceptance
        setIsVisible(false);
        toast.success(t("cookieThank")); // Show toast message
        console.log("Cookies accepted");
    };

    const handleRejectCookies = () => {
        setCookie('cookiesAccepted', false, { path: '/' }); // Optionally set a cookie to indicate rejection
        setIsVisible(false);
        console.log("Cookies rejected");
    };

    return (
        <>
            {isVisible && (
                <Box className="cookie-consent">
                    <p>
                        {t("cookieDesc")}
                    </p>
                    <div className="cookie-buttons flex flex-row justify-evenly items-center">
                        <button className='btn' onClick={handleAcceptCookies}>{t("cookieAccept")}</button>
                        <button className='btnX' onClick={handleRejectCookies}>{t("cookieReject")}</button>
                    </div>
                    {cookies.cookiesAccepted && <p>{t("cookieThank")}</p>}
                </Box>
            )}
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
        </>
    );
};

export default CookieConsent;