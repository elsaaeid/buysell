import React, { useContext } from 'react'
import { Context } from '../../../context/Context';

export const AccountArHead = () => {
      // show account menu
      const {show, setShow} = useContext(Context);
    
      const handleClick = () => {
        setShow(!show);
      };
  return (
    <div onClick={handleClick}>
        الحساب
    </div>
  )
}
