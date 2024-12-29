import React from 'react';
import {Link} from "react-router-dom";

const BoxItem = ({
    path,
    indexNum,
    handleBoxHover,
    handleBoxLeave,
    box,
    title,
}) => {

  return (
    <div 
      data-zindex={indexNum}
      onMouseEnter={handleBoxHover}
      onMouseLeave={handleBoxLeave}
      className={`box ${box} flex justify-center items-center`}>
      <Link to={path}>
          <h3>{title}</h3>
      </Link>
    </div>
  );
};

export default BoxItem;
