import React, { useState, useEffect, useCallback } from "react";
import "./CookieConsent.css"; // Import your CSS for styling
import { Box, useTheme } from "@mui/material";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useSelector } from "react-redux";
import { tokens } from "../../../theme";



const cookies = new Cookies();

const CookieConsent = () => {
  // Translation
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Check if cookies have already been accepted (runs once on mount)
  useEffect(() => {
    const cookiesAccepted = cookies.get("cookiesAccepted");
    if (cookiesAccepted) {
      setIsVisible(false);
    }
  }, []);

  // Memoize the function to handle accepting cookies
  const handleAcceptCookies = useCallback(() => {
    try {
      cookies.set("cookiesAccepted", true, { path: "/", maxAge: 3600 }); // Cookie expires in 1 hour
      cookies.set("username", user || "Guest", { path: "/", maxAge: 3600 }); // Store username or default to "Guest"
      setIsVisible(false);
      toast.success(t("cookieThank")); // Show toast message
      console.log("Cookies accepted");
    } catch (error) {
      console.error("Error setting cookies:", error);
      toast.error(t("cookieErrorAccept")); // Show error toast
    }
  }, [t, user]);

  // Memoize the function to handle getting cookies
  const handleGetCookie = useCallback(() => {
    try {
      const username = cookies.get("username");
      if (username) {
        alert(`${t("welcomeBack")}, ${username}!`);
      } else {
        alert(t("noCookie"));
      }
    } catch (error) {
      console.error("Error getting cookies:", error);
      toast.error(t("cookieErrorGet")); // Show error toast
    }
  }, [t]);

  // Memoize the function to handle rejecting cookies
  const handleRejectCookies = useCallback(() => {
    try {
      cookies.remove("cookiesAccepted", { path: "/" });
      cookies.remove("username", { path: "/" });
      setIsVisible(false);
      toast.info(t("cookieRejectMessage")); // Show toast message for rejection
      console.log("Cookies rejected");
    } catch (error) {
      console.error("Error removing cookies:", error);
      toast.error(t("cookieErrorReject")); // Show error toast
    }
  }, [t]);

  return (
    <>
      {isVisible && (
        <Box className="cookie-consent" style={{
          background: colors.grey[700]
        }}>
          <p>{t("cookieDesc")}</p>
          <div className="cookie-buttons flex flex-row justify-evenly items-center">
            <button className="btn" onClick={handleAcceptCookies}>
              {t("cookieAccept")}
            </button>
            <button className="btnX" onClick={handleRejectCookies}>
              {t("cookieReject")}
            </button>
            <button className="btnX" onClick={handleGetCookie}>
              {t("getCookie")}
            </button>
          </div>
        </Box>
      )}
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </>
  );
};

export default CookieConsent;