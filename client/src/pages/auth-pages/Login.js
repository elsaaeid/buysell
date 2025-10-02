import React, { useState, useEffect } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import Spinner from "../../components/global-components/Spinner";
import {Box} from '@mui/material';
import PasswordInput from "../../components/global-components/auth/password-input/PasswordInput";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PageMenu from "../../components/global-components/page-menu/PageMenu";



// Initial State
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  // Form Data
  const [formData, setFormData] = useState(initialState);
  // Form Data Passing
  const { email, password } = formData;
  // Translation
  const { t } = useTranslation();
  // Input Change handle Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Use Dispatch
  const dispatch = useDispatch();
  // Use Navigate
  const navigate = useNavigate();

  // Auth States Select
  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor } =
    useSelector((state) => state.auth);

    // Theme Colors Mode
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Login User Function
    const loginUser = async (e) => {
      e.preventDefault();
      
      if (!email || !password) {
        return toast.error("All fields are required");
      }

      if (!validateEmail(email)) {
        return toast.error("Please enter a valid email");
      }
      const userData = {
        email,
        password,
      };
    
      // console.log(userData);
      await dispatch(login(userData));
    };


    // Navigating Side Effect
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

  // Google Login Function
  const googleLogin = async (credentialResponse) => {
    // console.log(credentialResponse);
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
    navigate("/");
  };


  return (
    <PageMenu 
      firstLinkNav="/register" firstTitleNav={t("registerForm.signUp")}
      secondLinkNav="/login" secondTitleNav={t("registerForm.Login")}>
      <div className={`${styles.auth} p-3`}>
          <div 
            className={styles.form}>
            <div className="flex flex-col justify-center items-center">
              <BiLogIn size={35} 
                style={{
                  color: colors.grey[500],
                }}
              />
            <h1
              style={{
                color: colors.grey[500],
              }}
              >{t("registerForm.Login")}</h1>
            </div>
            <br />
            <Box className="flex flex-col justify-center items-center">
              <GoogleLogin
                onSuccess={googleLogin}
                onError={() => {
                  console.log("Login Failed");
                  toast.error("Login Failed");
                }}
              />
              <br />
              <p className="text-center font-bold text-white">Or</p>
            </Box>
            <form onSubmit={loginUser}>
              <div className="flex justify-center items-center">
                <input
                  type="email"
                  placeholder={t("registerForm.email")}
                  required
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  style = {{
                      backgroundColor: colors.grey[900],
                    }}
                />
              </div>
              <PasswordInput 
                  name="password" 
                  placeholder={t("registerForm.password")}
                  value={password} 
                  handleInputChange={handleInputChange} 
                />
              <Box className="w-1/2 flex justify-center items-center">
              <button type="submit" className="btnX flex justify-center items-center w-full">
                {
                  isLoading ? <Spinner />
                  :
                    <span>{t("registerForm.Login")}</span>
                  }
              </button>
              </Box>        
            </form>
            <Box className="flex flex-row justify-evenly items-center mt-3 w-full">
              <span className={styles.forget}>
                <Link to="/forget">{t("registerForm.forgotPassword")}</Link>
              </span>
              <span className={styles.links}>
                <Link to="/">{t("Home")}</Link>
              </span>
            </Box>
          </div>
      </div>
    </PageMenu>
  )
};

export default Login;