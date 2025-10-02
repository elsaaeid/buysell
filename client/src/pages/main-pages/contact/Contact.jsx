import React from "react"
import './contact.css';
import {MdContactPhone} from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";
import ContactForm from "../../../components/global-components/contact-form/ContactForm"
import ContactOption from "./ContactOption";



const Contact = ()=> {
		// Translation
		const { t } = useTranslation();
        return (
            <section className='flex flex-col items-center justify-center'>
				<Box className='branch-container'>
					<MdContactPhone className='icon-branch' />
				</Box>
				<Box className="flex flex-col items-center justify-center w-full mb-2">
					<h5>{t("contact.getInTouch")}</h5>
				</Box>
				<Box className="contact__container">
					<ContactOption />
					{/* END OF CONTACT OPTOINS */}
					<ContactForm />
				</Box>
            </section> 
        )
}
export default Contact;