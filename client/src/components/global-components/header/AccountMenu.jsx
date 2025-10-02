import React, {useContext, useState} from 'react';
import {Box, MenuItem, ListItemIcon, Divider} from '@mui/material';
import {RiLoginCircleLine} from 'react-icons/ri';
import {RiLogoutCircleLine} from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ShowOnLogin, ShowOnLogout } from "../../../protect/HiddenLink";
import Profile from "../profile/Profile";
import { useDispatch } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { logout, RESET } from "../../../redux/features/auth/authSlice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AdminAuthorLink } from "../../../protect/HiddenLink";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { Context } from '../../../context/Context';
import { UserName } from "./UserName"
import { IoCloseSharp } from "react-icons/io5";


export const AccountMenu = ()=> {
  // App Context
  const { toggleTab, joinState, setJoinState, setShowMenu } = useContext(Context);

  // Translation
  const { t } = useTranslation();
  // Profile Title Showing States
  const [profileShowTitle, setProfileShowTitle] = useState(true);
  // Profile Content Showing States
  const [profileShowContent, setProfileShowContent] = useState(false);
  // Use Navigation
  const navigate = useNavigate();
  // Anchor Element Closing Function
  const handleClose = () => {
    setShowMenu(false);
  };
  // use Dispatch
  const dispatch = useDispatch();

  // logout User Function
  const logoutUser = async () => {
     // join-title state
     setJoinState(true);
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  // go To Login Function
  const goToLogin = ()=>{
    navigate('/login');
    handleClose();
    toggleTab("2");
  };
  
  // go To Register Function
  const goToRegister = ()=>{
    navigate('/register');
    handleClose();
    toggleTab("1");
  };

  // Profile Handling Function
  const profileHandling = ()=>{
    setProfileShowTitle(false);
    setProfileShowContent(true);
  };

  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
        <Box 
            className='item-menu'>
            <Box
                className='menu'
                style={{
                    backgroundColor: colors.grey[900],
                }}
                >
                <Box className="close">
                    <span onClick={handleClose}>
                    <IoCloseSharp 
                        style={{
                        backgroundColor: colors.grey[700],
                        color: colors.grey[500],
                        }}
                        className='icon' />
                    </span>
                </Box>
                <Box 
                style={{
                    color: colors.grey[500],
                }}
                className="flex flex-col">
                {
                    joinState ?
                    (<Box
                    className="register-title w-full flex justify-center items-center p-3">
                    <h3
                    style={{
                        color: colors.grey[500],
                    }}
                    >{t("profile.registerTitle")}</h3>
                    </Box>
                    )
                : null
                    }
                </Box>
                <Box
                className='flex flex-col justify-center items-center w-full'
                style={{
                    color: colors.grey[500],
                }}
                >
                <ShowOnLogin>
                    <UserName onClick={handleClose} />
                    <Divider />
                    <MenuItem className="w-full h-full">
                    {profileShowTitle && 
                        <NavLink 
                            className="flex flex-row justify-center items-center w-full" 
                            onClick={profileHandling}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        {t("profile.name")}
                        </NavLink>}
                    {profileShowContent && <Box className="flex flex-col justify-center items-center w-full">
                        <Profile setProfileShowTitle={setProfileShowTitle} setProfileShowContent={setProfileShowContent} />
                    </Box>}
                    </MenuItem>
                    <Divider />
                </ShowOnLogin>
                <ShowOnLogout>
                    <MenuItem onClick={goToRegister} className="w-full h-full">
                    <NavLink
                        className="flex flex-row justify-center items-center w-full"
                        >
                        <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        {t("registerForm.signUp")}
                    </NavLink>
                    </MenuItem>
                    <Divider />
                </ShowOnLogout>
                <ShowOnLogout>
                    <MenuItem onClick={goToLogin} className="w-full h-full">
                    <NavLink
                        to='/login'
                        className="flex flex-row justify-center items-center w-full"
                        >
                        <ListItemIcon>
                            <RiLoginCircleLine fontSize="small" />
                        </ListItemIcon>
                        {t("registerForm.Login")}
                    </NavLink>
                    </MenuItem>
                    <Divider />
                </ShowOnLogout>
                    <AdminAuthorLink>
                        <MenuItem onClick={handleClose} className="w-full h-full">
                        <NavLink
                            to='/products-dashboard'
                            className="flex flex-row justify-center items-center w-full"
                            >
                            <ListItemIcon>
                                <AdminPanelSettingsIcon fontSize="small" />
                            </ListItemIcon>
                                {t("registerForm.adminPanel")}
                        </NavLink>
                        </MenuItem>
                    </AdminAuthorLink>
                <ShowOnLogin>
                <Divider />
                    <MenuItem onClick={logoutUser} className="w-full h-full">
                    <NavLink className="flex flex-row justify-center items-center w-full">
                        <ListItemIcon>
                        <RiLogoutCircleLine />
                        </ListItemIcon>
                            {t("registerForm.Logout")}
                    </NavLink>
                    </MenuItem>
                </ShowOnLogin>
                </Box>
            </Box>
        </Box>
  )
}