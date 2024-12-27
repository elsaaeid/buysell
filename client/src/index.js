import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./translation/i18n";
import CookieConsent from './components/global-components/cookie-consent/CookieConsent';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading....</div>}>
          <App />
          <CookieConsent />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);