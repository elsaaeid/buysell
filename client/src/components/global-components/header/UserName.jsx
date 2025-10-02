import React from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/auth/authSlice";


export const UserName = () => {
  // A hook to access the redux store's state.
  const user = useSelector(selectUser);

  // Shorten For Text
   const shortenText = (text, n) => {
    if (text.length > n) {
      const shoretenedText = text.substring(0, n).concat("...");
      return shoretenedText;
    }
    return text;
  };
  
  const username = user?.name || "...";

  return 
   ( 
    <p className="flex flex-row mb-3 justify-around items-center w-full">
        Hi, {shortenText(username, 9)}
    </p>
    )
};
