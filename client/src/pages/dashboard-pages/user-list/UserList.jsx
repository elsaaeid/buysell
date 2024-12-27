import React from "react";
import UserStats from "../../../components/dashboard-components/userStates/UserStates";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import UsersList from "../../../components/dashboard-components/usersList";
import Loader from "../../../components/global-components/Loader";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";


const UserList = () => {
  useRedirectLoggedOutUser("/login");
  const { isLoading } = useSelector(
    (state) => state.auth.user
  );

  return (
    <Box className="w-full" p="20px">
    {isLoading ? (
      <Loader />
    ) 
    : 
    (
      <div>
        <UserStats />
        <UsersList />
      </div>
          )
        }
    </Box>
  );
};


export default UserList;
