import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import WOW from 'wowjs';

const ContactForm = () => {
  const wowRef = React.useRef(null); // Create a ref for WOW.js
     // Theme Colors Mode
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
  	// Translation
    const { t } = useTranslation();
    // "Send Email" Function
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_0wl59ed', 'template_5vc4rg7', e.target, 'cnPFS7uNaxn0ShtpF')
      .then((result) => {
        toast("The message has been sent successfully");
        console.log(result.text);
      }, (error) => {
        toast(error);
        console.log(error.text);
      });
      e.target.reset();
      };

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
    <form className="contact-form wow fadeInUp" onSubmit={sendEmail}>
      <input
        style = {{
          backgroundColor: colors.grey[900],
        }}
        className="mt-3"
        type="text" 
        name="name" 
        placeholder={t("contact.fullName")}
        required
                />
      <input
        style = {{
          backgroundColor: colors.grey[900],
        }}
        className="mt-3"
        type="email" 
        name="email" 
        placeholder={t("contact.email")}
        required
                />
      <input 
        style = {{
          backgroundColor: colors.grey[900],
        }}
        className="mt-3"
        type="text"
        name="subject" 
        placeholder={t("contact.subject")}
        required />
      <textarea 
        style = {{
          backgroundColor: colors.grey[900],
        }}
        className="mt-3"
        name="message" 
        rows="7" 
        placeholder={t("contact.message")}
        required ></textarea>	
      <button
        className="btn btn-primary mt-3"
        id='submit' type="submit">{t("contact.sendMessage")}</button>
        <ToastContainer />
  </form>
  );
};

export default ContactForm;











