import React, { useState, useEffect, useContext } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { VscPreview } from "react-icons/vsc";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";


const ServiceShowToggle = ({ item })=>{
  // Replacing Between Home Page and Service Page 
  const [btnReplace, setBtnReplace] = useState(true);

  // App Context
  const {btnState} = useContext(Context);
  // Use Location
  let location = useLocation();

  // Replacing Between services Page and Service Page - Side Effect
  useEffect(()=> {
      if(location.pathname === "/services") {
        setBtnReplace(true);
      }
      else if (location.pathname === `/service/${item.id}`) {
        setBtnReplace(false);
      }
  }, [location.pathname, item.id]);

    return(
        <Link
            to={btnReplace ? `/service/${item.id}` : `/services#${item.id}`}
            underline="none"
            className={btnState === "reviewActive" ? "btn btn-active flex flex-row items-center" : "btn flex flex-row items-center"}
            >
            {
              btnReplace ?
            (<div 
              className='flex flex-row items-center justify-content-evenly'
              onClick={ btnReplace ? ()=>{setBtnReplace(false)} : ()=>{setBtnReplace(true)} }
            >
              <span className="mr-2"><VscPreview /></span>
              <span>{item.reviewService}</span>
            </div>)
            :
            (<ArrowForwardIcon className="cursor-pointer" />)
            }
          </Link>
    )
}
export default ServiceShowToggle;