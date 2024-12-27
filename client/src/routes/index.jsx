import React from 'react';
import Login from '../pages/auth-pages/Login.js';
import Register from '../pages/auth-pages/Register.js';
import Forget from "../pages/auth-pages/Forget.js";
import Reset from "../pages/auth-pages/Reset.js";
import Verify from "../pages/auth-pages/Verify.js";
import LoginWithCode from "../pages/auth-pages/LoginWithCode.js";
import Error from '../pages/portfolio-pages/Error.jsx';
import { Routes, Route } from "react-router-dom";
import UserList from "../pages/dashboard-pages/user-list/UserList.jsx";
import MainLayout from "../components/global-components/layout/MainLayout.jsx";
import DashboardLayout from "../components/global-components/layout/DashboardLayout.jsx";
import EditProfile from "../components/global-components/profile/EditProfile.js";
import ChangePassword from '../components/global-components/changePassword/ChangePassword.js';
import PageMenu from "../components/global-components/page-menu/PageMenu.jsx";
import Home from '../pages/portfolio-pages/home/Home.jsx';
import Contact from '../pages/portfolio-pages/contact/Contact.jsx';
import Clothes from '../pages/portfolio-pages/clothes/Clothes.jsx';
import Clothe from '../pages/portfolio-pages/clothes/Clothe.jsx';
import HealthBeauties from '../pages/portfolio-pages/health-beauty/HealthBeauties.jsx';
import HealthBeauty from '../pages/portfolio-pages/health-beauty/HealthBeauty.jsx';
import Electronics from '../pages/portfolio-pages/electronics/Electronics.jsx';
import Electronic from '../pages/portfolio-pages/electronics/Electronic.jsx';
import SchoolTools from '../pages/portfolio-pages/school-tools/SchoolTools.jsx';
import SchoolTool from '../pages/portfolio-pages/school-tools/SchoolTool.jsx';
import Housewares from '../pages/portfolio-pages/housewares/Housewares.jsx';
import Houseware from '../pages/portfolio-pages/housewares/Houseware.jsx';
import productsItems from "../components/global-components/global/productsItems.js"
import mainItems from "../components/global-components/global/mainItems.js"
import dashboardItems from "../components/global-components/global/dashboardItems.js"
import { t } from 'i18next';
import Checkout from '../pages/portfolio-pages/checkout/Checkout.jsx';
import Shows from '../pages/portfolio-pages/shows/Shows.jsx';
import Show from '../pages/portfolio-pages/shows/Show.jsx';
import AddProducts from '../pages/dashboard-pages/addProducts/AddProducts.jsx';
import EditProducts from '../pages/dashboard-pages/editProducts/EditProducts.jsx';
import ProductsDashboard from '../pages/dashboard-pages/products-dashboard/index.jsx';
import Products from '../pages/portfolio-pages/products/Products.jsx';
import Product from '../pages/portfolio-pages/products/Product.jsx';


const index = () => {
  return(
    <Routes>
      <Route path="/register" element={
        <PageMenu 
          firstLinkNav="/register" firstTitleNav={t("registerForm.signUp")}
          secondLinkNav="/login" secondTitleNav={t("registerForm.Login")}
          >
          <Register />
        </PageMenu>
        } 
      />
      <Route path="/login" element={
        <PageMenu 
          firstLinkNav="/register" firstTitleNav={t("registerForm.signUp")}
          secondLinkNav="/login" secondTitleNav={t("registerForm.Login")}
          >
          <Login />
        </PageMenu>
      } 
    />
      <Route path="/forget" element={<Forget />} />
      <Route path="/resetPassword/:resetToken" element={<Reset />} />
      <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
      <Route
        path="/verify/:verificationToken"
        element={
          <Verify />
        }
      />
      {/*Portfolio*/}
      <Route path='/' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Home />
        </MainLayout>
      } />
      <Route path='/account' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Home />
        </MainLayout>
      } />

      <Route path='/products' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Products />
        </MainLayout>
      } />
      <Route path='/product/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Product />
        </MainLayout>
      } />
      
      <Route path='/clothes' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Clothes />
        </MainLayout>
      } />
      <Route path='/clothe/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Clothe />
        </MainLayout>
      } />

      <Route path='/health-beauties' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <HealthBeauties />
        </MainLayout>
      } />
      <Route path='/health-beauty/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <HealthBeauty />
        </MainLayout>
      } />

      <Route path='/electronics' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Electronics />
        </MainLayout>
      } />
      <Route path='/electronic/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Electronic />
        </MainLayout>
      } />

      <Route path='/school-tools' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <SchoolTools />
        </MainLayout>
      } />
      <Route path='/school-tool/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <SchoolTool />
        </MainLayout>
      } />
      
      <Route path='/housewares' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Housewares />
        </MainLayout>
      } />
      <Route path='/houseware/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Houseware />
        </MainLayout>
      } />

      <Route path='/shows' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Shows />
        </MainLayout>
      } />
      <Route path='/show/:id' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Show />
        </MainLayout>
      } />

      {/*Products Dashboard*/}
      <Route path='/products-dashboard' element={
          <DashboardLayout productsItems={productsItems} dashboardItems={dashboardItems}>
            <ProductsDashboard />
          </DashboardLayout>
        } />
      <Route path='/add-products' element={
        <DashboardLayout productsItems={productsItems} dashboardItems={dashboardItems}>
          <AddProducts />
        </DashboardLayout>
      } />
      <Route path='/edit-products' element={
        <DashboardLayout productsItems={productsItems} dashboardItems={dashboardItems}>
          <EditProducts />
        </DashboardLayout>
      } />
      
      <Route path='/checkout' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Checkout />
        </MainLayout>
      } />
      <Route path='/contact' element={
        <MainLayout mainItems={mainItems} productsItems={productsItems}>
          <Contact />
        </MainLayout>
      } />
      <Route
        path="/edit-profile"
        element={
            <PageMenu 
              firstLinkNav="/edit-profile" firstTitleNav={t("profile.editProfile")}
              secondLinkNav="/change-password" secondTitleNav={t("chPassword.changePassword")}
            >
              <EditProfile />
            </PageMenu>
            }
          />
      <Route
      path="/change-password"
      element={
          <PageMenu 
            firstLinkNav="/edit-profile" firstTitleNav={t("profile.editProfile")}
            secondLinkNav="/change-password" secondTitleNav={t("chPassword.changePassword")}
            >
            <ChangePassword />
          </PageMenu>
          }
        />
    
      {/*Users Dashboard*/}
      <Route path='/users' element={
        <DashboardLayout productsItems={productsItems} dashboardItems={dashboardItems}>
          <UserList />
        </DashboardLayout>} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default index;
