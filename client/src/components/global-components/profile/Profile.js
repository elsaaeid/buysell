import React, { useContext } from "react";
import "./Profile.scss";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom"
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { Context } from '../../../context/Context';
    


const Profile = ({setProfileShowTitle, setProfileShowContent}) => {
  // App Context
  const {toggleTab, profile, imagePreview} = useContext(Context);

  // Translation
  const { t } = useTranslation();
  // Use Redirect Of LoggedOut User
  useRedirectLoggedOutUser("/login");
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Auth State Select
  const { isLoading, user } = useSelector(
    (state) => state.auth
  );

  // Profile Handling Function
  const profileHandling = ()=>{
    setProfileShowTitle(true);
    setProfileShowContent(false);
  }

  // goTo EditProfile Function
   const goToEditProfile = ()=>{
    toggleTab("1");
  }
  return (
      <div>
        {isLoading && <Loader />}
          <div className="flex flex-col justify-center items-center profile w-full">
            <span className="flex flex-col justify-center items-start w-full ml-5">
              <ArrowForwardIcon onClick={profileHandling} />
            </span>
            {!isLoading && user && (
              <div className="content-profile flex flex-col justify-center items-center">
                <div className="profile-photo rounded-full">
                  <img
                    src={imagePreview === null ? user?.photo : imagePreview}
                    alt="ProfileImg"
                    />
                </div>
                <div className="profile-details">
                  <div className="m-5 flex justify-center items-center">
                    <h3
                    style={{
                      color: colors.grey[500],
                    }}
                    >{t("profile.role")}: {profile.role}</h3>
                  </div>
                    <p className="mb-3 flex flex-col justify-center align-content-center">{t("profile.profileName")}: {profile.name}</p>
                    <p className="mb-3 flex flex-col justify-center align-content-center">{t("profile.profileEmail")}: {profile.email}</p>
                    <p className="mb-3 flex flex-col justify-center align-content-center">{t("profile.phone")}: {profile.phone}</p>
                    <p className="mb-3 flex flex-col justify-center align-content-center">{t("profile.bio")}: {profile.bio}</p>
                  </div>
                <Link className="btn mb-3" onClick={goToEditProfile} to="/edit-profile">{t("profile.editProfile")}</Link>
              </div>
            )}
          </div>
      </div>
  );
};
export default Profile;