import React, { useState, useEffect } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/global-components/card/Card";
import { BsCheck2All } from "react-icons/bs"
import { FaTimes } from "react-icons/fa"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/global-components/Spinner";
import {Box} from '@mui/material';
import PasswordInput from "../../components/global-components/auth/password-input/PasswordInput";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import imageUpload from "../../assets/profile.png";
import PageMenu from "../../components/global-components/page-menu/PageMenu";




// Initial State
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};


const Register = () => {
  // Form Data
  const [formData, setFormData] = useState(initialState);
  // Form Data Passing
  const { 
    name, 
    email, 
    password, 
    password2,
  } = formData;
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
// Translation
  const { t } = useTranslation();
  // Use Dispatch
  const dispatch = useDispatch();
  // Use Navigate
  const navigate = useNavigate();
  //Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Slice Auth States Select
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  // Use Case States
  const [uCase, setUCase] = useState(false);
  // Numbers States
  const [num, setNum] = useState(false);
  // Characters States
  const [sChar, setSChar] = useState(false);
  // Password Length States
  const [passLength, setPassLength] = useState(false);

  // Icons Components
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  // Switch Icon Conditions
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };


  // Input Change Handle Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   // Image Change Handle Function
   const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the base64 string
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setImagePreview(null);
    }
  };

  // Register States Checking
  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  // register User Function
  const registerUser = async (e) => {
    e.preventDefault();

    if (!photo || !name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      photo,
      name,
      email,
      password,
    }
    // console.log(userData);
    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  // navigate Side Effect 
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);


  return (
    <PageMenu 
      firstLinkNav="/register" firstTitleNav={t("registerForm.signUp")}
      secondLinkNav="/login" secondTitleNav={t("registerForm.Login")}>
      <div className={`${styles.auth} p-3 mt-5`}>
          <div className={styles.form}
            style={{
              background: colors.grey[900],
            }}
          >
            <div className="flex flex-col justify-center items-center mb-2">
              <TiUserAddOutline size={35} 
              style={{
                color: "var(--color-primary)",
              }}
              />
              <h1
              style={{
                color: "var(--color-primary)",
              }}
              >{t("registerForm.signUp")}</h1>
            </div>
            <br />
            <form onSubmit={registerUser}>
              <input
                  type="file"
                  name="image"
                  accept="image/*" // Restrict to image files
                  onChange={handleImageChange}
                  id="image-upload" // Give it an ID for the label
                  style = {{
                    backgroundColor: colors.grey[900],
                    display: 'none',
                  }}
              />
              <label htmlFor="image-upload">
              {imagePreview ? (
                  <Box 
                    style={{
                      width: "70px",
                      height: "auto",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                    >
                      <img src={imagePreview} alt="Selected" />
                  </Box>
              ) : (
                  <Box 
                    style={{
                      width: "70px",
                      height: "auto",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                    className="cursor-pointer">
                    <img src={imageUpload} alt="Selected" />
                  </Box>
              )}
              </label>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder={t("registerForm.name")}
                  required
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  style = {{
                    backgroundColor: colors.grey[900],
                  }}
                />
              </div>
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
              <PasswordInput 
                  name="password2" 
                  placeholder={t("registerForm.confirmPassword")}
                  value={password2} 
                  handleInputChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Cannot paste into input field");
                    return false;
                  }}
                />
              {/* Password Strength */}
              {password && (
                <Card cardClass="group mt-2">
                  <ul className="form-list">
                    <li className="flex items-center">
                      <span className="indicator">
                        {switchIcon(uCase)}
                      </span>
                      <span>
                      &nbsp; {t("registerForm.uppercase")}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="indicator">
                        {switchIcon(num)}
                      </span>
                      <span>
                        &nbsp; {t("registerForm.number")} (0-9)
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="indicator">
                      {switchIcon(sChar)}
                      </span>
                      <span>
                        &nbsp; {t("registerForm.specialCharacter")} (!@#$%^&*)
                    </span>
                    </li>
                    <li className="flex items-center">
                      <span className="indicator">
                        {switchIcon(passLength)}
                      </span>
                      <span>
                        &nbsp; {t("registerForm.leastCharacter")}
                      </span>
                    </li>
                  </ul>
                </Card>
              )}
              <br />
              <Box className="submit-content flex justify-center items-center">
              <button type="submit" className="btnX flex justify-center items-center w-full">
                {
                  isLoading ? <Spinner />
                  :
                  <span
                  >{t("registerForm.signUp")}</span>
                }
              </button>
              </Box>
            </form>
            <br />
            <div className="flex flex-row justify-center items-center">
              <span className={styles.links}>
                <Link to="/"
                style={{
                  color: colors.grey[500],
                }}
                >{t("Home")}</Link>
              </span>
            </div>
          </div>
      </div>
    </PageMenu>
  );
};

export default Register;