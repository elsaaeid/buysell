import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, upgradeUser } from "../../../redux/features/auth/authSlice";
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from "../../../redux/features/email/emailSlice";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";




const ChangeRole = ({ _id, email }) => {
  // user Role State
  const [userRole, setUserRole] = useState("");
  // A hook to access the redux dispatch function
  const dispatch = useDispatch();
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
	// Translation
	const { t } = useTranslation();

  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please select a role");
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    const emailData = {
      subject: "Account Role Changed",
      send_to: email,
      reply_to: "saidsadaoy@gmail.com",
      template: "changeRole",
      url: "/login",
    };

    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    dispatch(EMAIL_RESET());
  };

  return (
    <div>
      <form
        className="flex flex-row justify-center items-center"
        onSubmit={(e) => changeRole(e, _id, userRole)}
      >
        <select
          style={{
            color: colors.grey[500],
            backgroundColor: colors.grey[900],
          }} 
          value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">-- {t("dashboard.changeRole.select")} --</option>
          <option value="subscriber">{t("dashboard.changeRole.Subscriber")}</option>
          <option value="author">{t("dashboard.changeRole.Author")}</option>
          <option value="admin">{t("dashboard.changeRole.Admin")}</option>
          <option value="suspended">{t("dashboard.changeRole.Suspended")}</option>
        </select>
        <button className="btn">
          <FaCheck size={10} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;