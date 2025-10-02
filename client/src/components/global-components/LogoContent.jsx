import React from 'react';
import {Box} from '@mui/material';
import logo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom"


const LogoContent = () => {
  const navigate = useNavigate();
	const goHome = () => {
		navigate("/");
	  };
  return (
    <Box id="logo-content" className="logo-content cursor-pointer flex justify-center items-center flex-col" onClick={goHome}>
        <Box className='me flex flex-col justify-center items-center'>
            <img src={logo} alt="logo" />
        </Box>
    </Box>
  )
}

export default LogoContent