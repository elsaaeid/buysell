import React from "react";
import '../../../components/global-components/GlobalSection.css';
import {BsPersonWorkspace} from "react-icons/bs";
import ElectronicsContainer from "./ElectronicsContainer";
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";



function Electronics() {
	// Translation
	const { t } = useTranslation();
    return (
      <section className="flex flex-col items-center justify-center">
              <Box className='branch-container'>
                  <BsPersonWorkspace  className='icon-branch' />
              </Box>
              <Box className="w-full flex flex-col items-center justify-center">
                <h2>{t("electronics.title")}</h2>
                <p className='mb-3 p-2'>{t("electronics.theDesc")}</p>
              </Box>
                <ElectronicsContainer />
      </section>
    )
    };
export default Electronics;



