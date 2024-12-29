import React from "react";
import '../../../components/global-components/GlobalSection.css';
import {BsPersonWorkspace} from "react-icons/bs";
import HealthBeautiesContainer from "./HealthBeautiesContainer";
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";



function HealthBeauties() {
	// Translation
	const { t } = useTranslation();
    return (
      <section className="flex flex-col items-center justify-center">
              <Box className='branch-container'>
                  <BsPersonWorkspace  className='icon-branch' />
              </Box>
              <Box className="w-full flex flex-col items-center justify-center">
                <h2>{t("healthBeauty.title")}</h2>
                <p className='mb-3 p-2'>{t("healthBeauty.theDesc")}</p>
              </Box>
                <HealthBeautiesContainer />
      </section>
    )
    };
export default HealthBeauties;



