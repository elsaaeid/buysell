import React from 'react';
import { makeStyles } from '@mui/styles'; // Updated to use @mui/styles
import Alert from '@mui/material/Alert'; // Updated import path
import IconButton from '@mui/material/IconButton'; // Updated import path
import Collapse from '@mui/material/Collapse'; // Updated import path
import CloseIcon from '@mui/icons-material/Close'; // Corrected import for CloseIcon
import { Box } from "@mui/material";
import { Button } from '@mui/material'; // Updated import path
import CircularIndeterminate from "../../global-components/Spinner";
import { useCookies } from 'react-cookie';
import "./TransitionAlerts.css";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '3px',
  },
}));

export default function TransitionAlerts({
  setAlretState, 
  open, 
  setOpen
}) {
  const classes = useStyles();
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  const [loading, setLoading] = React.useState(false);

  // Translation
  const { t } = useTranslation();

  // Loading Timeout Handling Function
  const loadingHandling = () => {
    setTimeout(function() {
      setLoading(false);
      setAlretState(prev => !prev);
    }, 9000);
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Box className="flex flex-col cookie">
            <Box className="flex flex-col justify-center items-center mb-1">
              <h2 className='cookie-title'>{t("homeContainer.cookieTitle")}</h2>
            </Box>
            <p>{t("homeContainer.cookieDesc")}</p>
            <div className="flex">
              <Button className="got-it mt-4 flex flex-end" onClick={() => { 
                alert('Cookies will use for session management.');
                setLoading(true);
                loadingHandling();
              }} variant="contained">
                {t("homeContainer.GotIt")}
                {loading ? (<CircularIndeterminate />) : null}
              </Button>
            </div>
          </Box>
        </Alert>
      </Collapse>
    </div>
  );
}