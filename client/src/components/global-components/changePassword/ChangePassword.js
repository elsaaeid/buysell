import React, { useState } from "react";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import {
  changePassword,
  logout,
  RESET,
} from "../../../redux/features/auth/authSlice";
import { sendAutomatedEmail } from "../../../redux/features/email/emailSlice";
import Card from "../../global-components/card/Card";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../auth/password-input/PasswordInput";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";
import {Box} from "@mui/material";
import { useTranslation } from "react-i18next";
 

// Initial State
const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  // Translation
  const { t } = useTranslation();

  // Use Redirect LoggedOut User
  useRedirectLoggedOutUser("/login");

  // Form Data States
  const [formData, setFormData] = useState(initialState);
  // formData Passing
  const { oldPassword, password, password2 } = formData;

  // Auth State Select
  const { isLoading, user } = useSelector((state) => state.auth);

  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // Input Change Handle Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Update Password Function
  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - portfolio alsaaeid",
      send_to: user.email,
      reply_to: "saidsadaoy@gmail.com",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };

  return (
        <Box className="p-5">
          <h2>{t("changePassword")}</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <>
                <form onSubmit={updatePassword}>
                  <p>
                    <label>{t("chPassword.curPass")}:</label>
                    <PasswordInput
                      placeholder={t("chPassword.curPass")}
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>{t("chPassword.newPass")}:</label>
                    <PasswordInput
                      placeholder={t("chPassword.newPass")}
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>{t("chPassword.confirmPass")}:</label>
                    <PasswordInput
                      placeholder={t("chPassword.confirmPass")}
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </p>
                  <Box className="flex justify-center items-center">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className="btn"
                    >
                      {t("changePassword")}
                    </button>
                  )}
                  </Box>
                </form>
              </>
            </Card>
          </div>
        </Box>
  );
};

export default ChangePassword;