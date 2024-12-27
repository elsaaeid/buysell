import React, { useContext } from 'react';
import './footer.css';
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import ActiveLink from '../../global-components/active-link/ActiveLink';
import TopFooter from './TopFooter';
import BottomFooter from './BottomFooter';
import {Context} from "../../../context/Context.js";



const Footer = ({items})=> {
	  const {activeNav, setActiveNav} = useContext(Context);

    const theme = useTheme();
 	const colors = tokens(theme.palette.mode); 
        // Translation
	const { t } = useTranslation();
	return (
			<footer
			    style={{
				background: colors.grey[900],
				height: "29rem",
				marginTop: "1rem",
				}}
				id="footer">
			<ActiveLink 
				clickHandling={() => setActiveNav('/')}
				classN={activeNav === '/' ? 'active global-Link' : 'global-Link'}
				href="/" title={t("logoTitle")}
			/>

		<Box className="permalinks row  flex flex-row justify-center items-center">
			<TopFooter items={items} />
		</Box>

		<Box className="footer__socials">
			<BottomFooter />
		</Box>
		<Box className="footer__copyright">
			<small>&copy; {t("footer.footerCpyRight")}</small>
		</Box>
		</footer> 
	)
}
export default Footer;