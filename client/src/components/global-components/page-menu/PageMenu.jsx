import React from "react";
import Topbar from "../global/Topbar";
import "./pageMenu.css";

const PageMenu = ({children, firstLinkNav, firstTitleNav, secondLinkNav, secondTitleNav}) => {
  
  return (
    <div className="registeration-content flex flex-col justify-center mt-5">
        <Topbar
          firstLinkNav={firstLinkNav} 
          firstTitleNav={firstTitleNav} 
          secondLinkNav={secondLinkNav} 
          secondTitleNav={secondTitleNav} 
          />
        <div className="auth-content">
          {children}
        </div>
    </div>
  );
};

export default PageMenu;