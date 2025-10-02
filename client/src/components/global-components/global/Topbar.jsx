import React, { useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { Context } from '../../../context/Context';



const Navbar = ({firstLinkNav, firstTitleNav, secondLinkNav, secondTitleNav}) => {

  // App Context
  const {orderState, toggleTab} = useContext(Context);

  // Active Tabs Side Effect
  useEffect(
  () => {
    const pathName = window.location.pathname;
    if (pathName === "/register") {
      document.getElementById("tabLeft").classList.add('active-tabs');
      document.getElementById("tabRight").classList.add('tabs');
    }
    else if(pathName === "/login") {
      document.getElementById("tabLeft").classList.add('tabs');
      document.getElementById("tabRight").classList.add('active-tabs');
    }
    else if(pathName === "/edit-profile") {
      document.getElementById("tabLeft").classList.add('active-tabs');
      document.getElementById("tabRight").classList.add('tabs');
    }
    else if(pathName === "/change-password") {
      document.getElementById("tabLeft").classList.add('tabs');
      document.getElementById("tabRight").classList.add('active-tabs');
    }
    }, []);

  return (
    <nav className="nav-top mb-5 flex justify-evenly items-center flex-row w-full">
      <NavLink 
        to={firstLinkNav}
        onClick={() =>toggleTab("1")} 
        id='tabLeft'
        className={orderState == "1" ? "tabs active-tabs" : "tabs"}>
          {firstTitleNav}
      </NavLink>
      <NavLink 
        to={secondLinkNav}
        onClick={() =>toggleTab("2")} 
        id='tabRight'
        className={orderState == "2" ? "tabs active-tabs" : "tabs"}>
          {secondTitleNav}
      </NavLink>
    </nav>
  )
}

export default Navbar