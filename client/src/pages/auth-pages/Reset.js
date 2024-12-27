import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";
import PasswordInput from "../../components/global-components/auth/password-input/PasswordInput";
import Spinner from "../../components/global-components/Spinner";
import Loader from "../../components/global-components/Loader";
import {Box} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";



// Initial State
const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  // Translation
  const { t } = useTranslation();
  // Form Data States
  const [formData, setFormData] = useState(initialState);
  // Form Data Passing
  const { password, password2 } = formData;
  // Reset Token Params
  const { resetToken } = useParams();

  // Loading States
  const [loading, setLoading] = useState(false);

  // State Auth Select
  const { isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // Use Dispatch
  const dispatch = useDispatch();
  // Use Navigate
  const navigate = useNavigate();
//Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Input Change Handle Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Reset Function
  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    setLoading(false);
  };

  // Navigate Side Effect
  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
    <div className={`${styles.auth} p-3`}>
      {isLoading && <Loader />}
      <div className={styles.form}>
        <div className="flex justify-center items-center">
          <MdPassword
            style={{
              color: colors.grey[500],
            }}
            size={35} />
        </div>
        <h1
          style={{
            color: colors.grey[500],
          }}
          >{t("registerForm.resetPassword")}</h1>

        <form onSubmit={reset}>
          <PasswordInput 
              name="password" 
              placeholder={t("registerForm.password")}
              value={password} 
              handleInputChange={handleInputChange} 
            />
          <PasswordInput 
              name="password2" 
              placeholder={t("registerForm.confirmPassword")}
              value={password2} 
              handleInputChange={handleInputChange} 
            />

            <Box className="w-1/2 flex justify-center items-center">
              <button type="submit" className="btnX flex justify-center items-center w-full">
                {
                  loading ? <Spinner />
                  :
                  <span>{t("registerForm.resetPassword")}</span>
                }
              </button>
            </Box>
            <div className="mt-5 mb-5 flex flex-row justify-evenly items-center w-full">
              <span className={styles.links_clChange}>
                <Link to="/">{t("Home")}</Link>
              </span>
              <span className={styles.links}>
                <Link to="/login">{t("registerForm.Login")}</Link>
              </span>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;