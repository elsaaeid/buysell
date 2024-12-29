import React from 'react';
import {MatrixParallax} from "react-matrix-parallax";
import { useTranslation } from "react-i18next";


const Error = () => {
  	// Translation
	const { t } = useTranslation();
  return (
    <MatrixParallax textAlign="center" color="#0f75bc">
    <div className="flex flex-row" style={{ fontSize: "1.7rem" }}>
      <h2>404</h2>
      <h5 style={{ maxWidth: "100vw" }}>{t("error.pageNotFound")}</h5>
    </div>
  </MatrixParallax>
  )
}

export default Error