import React from "react";
import {Link} from "react-router-dom"

import "./ActiveLink.css"


const ActiveLink = ({obj, href, classN, clickHandling}) => {

  return (
          <Link 
              className={classN}
              to={href} underline="none" onClick={clickHandling}>
            <span>{obj}</span>
          </Link>
  )
}

export default ActiveLink