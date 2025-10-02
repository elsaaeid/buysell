import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from "./PasswordInput.module.scss";
import i18n from '../../../../translation/i18n';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";


const PasswordInput = ({ name, value, placeholder, handleInputChange, onPaste }) => {
  // Theme Colors Mode
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  // Password Show and Unshow State
  const [passwordShow, setPasswordShow] = useState(false);
  // Show password icon state
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  // Effect to show/hide password icon based on input value
  useEffect(() => {
    setShowPasswordIcon(value.length > 0); // Show icon if there's input
  }, [value]);

  return (
    <div className="w-full flex flex-row justify-center items-center relative">
      <input
        type={passwordShow ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={(e) => {
          handleInputChange(e);
        }}
        onPaste={onPaste}
        style = {{
          backgroundColor: colors.grey[900],
        }}
      />
      {showPasswordIcon && (
        <div 
          className={styles.showPass} 
          style={{
            left: i18n.language == 'en' ? '' : '20px',
            right: i18n.language == 'ar' ? '' : '20px',
          }}
          onClick={() => setPasswordShow(!passwordShow)}
          role="button" 
          tabIndex={0} 
          onKeyPress={(e) => e.key === 'Enter' && setPasswordShow(!passwordShow)} // Accessibility for keyboard users
          aria-label={passwordShow ? "Hide password" : "Show password"} // Accessibility label
        >
          {passwordShow ? 
          <VisibilityOffIcon
           style = {{
            color: colors.grey[500],
          }} /> 
          : <RemoveRedEyeIcon 
            style = {{
              color: colors.grey[500],
            }}
          />}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;