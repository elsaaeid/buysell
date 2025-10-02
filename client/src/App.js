import React, { useEffect } from "react";
import Routes from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import Cursor from "./components/global-components/Cursor";
import { ContextProvider } from "./context/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  selectUser,
  getUser,
} from "./redux/features/auth/authSlice";
import ScrollProgressBar from "./components/global-components/scroll-progress-bar/ScrollProgressBar";




axios.defaults.withCredentials = true;

export const App = ()=> {
  // Theme State
  const [theme, colorMode] = useMode();
  // user Select
  const user = useSelector(selectUser);
  //Login Status
  const dispatch = useDispatch();

  // Auth State select
  const { isLoggedIn } =
      useSelector((state) => state.auth);

  // getLoginStatus Side Effect
  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <div className="app">
                <ScrollProgressBar />
                <ToastContainer />
                {/* <Cursor /> */}
                <ContextProvider>
                  <Routes />
                </ContextProvider>
              </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
    </GoogleOAuthProvider>
  );
}