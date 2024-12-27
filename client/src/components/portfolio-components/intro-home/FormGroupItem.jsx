import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const FormGroupItem = ({secondary, setSecondaryState}) => {
  	// Translation
	const { t } = useTranslation();
      const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
  return (
      <FormControlLabel
        control={
          <Checkbox
          style={{
                  color: colors.grey[500],
                }}
          checked={secondary}
          onChange={(event) => setSecondaryState(event.target.checked)}
        />
        }
        label={t("homeContainer.EnDesc")} />
  )
}

export default FormGroupItem;