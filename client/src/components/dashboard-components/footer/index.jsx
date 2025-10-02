import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  	// Translation
	const { t } = useTranslation();
  return (
    <div className="--flex-center --py2">
      <p>{t("footer.footerCpyRight")} &copy; 2023</p>
    </div>
  );
};

export default Footer;
