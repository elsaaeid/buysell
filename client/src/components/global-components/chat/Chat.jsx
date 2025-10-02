import React, { useRef, useEffect } from 'react';
import { Segment } from "semantic-ui-react";
import { ThemeProvider } from 'styled-components';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import "./chatBot.css";
import { usePresence } from "framer-motion";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import ChatBotComponent from './ChatBotComponent';


const Chat = () => {
  // Use Reference For "chat-container" Component
  const ref = useRef(null);
  const { t, i18n } = useTranslation();  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // To Present Or Remove Current Component
  const [isPresent, safeToRemove] = usePresence();
  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.()
      });
    }
  }, [isPresent, safeToRemove]);



  // Steps Of ChatBot 
  const steps = [
      {
          id: 'Greet',
          message: t('chat.great'),
          trigger: 'Ask Name'
      },
      {
          id: 'Ask Name',
          message: t('chat.askName'),
          trigger: 'waiting1'
      },
      {
          id: 'waiting1',
          user: true,
          trigger: 'Name',
      },
      {
          id: 'Name',
          // message: 'Hi {previousValue}! How can I help you today?',
          message: t('chat.nameResponse', { name: '{previousValue}' }),
          trigger: 'ask_howto'
      },
      {
          id: 'ask_howto',
          options: [
              {
                  value: 'Products',
                  label: t('chat.productsPrompt'),
                  trigger: 'products',
              },
          ],
      },
      {
          id: 'products',
          options: [
              { value: 'Clothes products', label: t('clothes.theDesc'), trigger: 'contacts' },
              { value: 'Housewares products', label: t('houseWares.theDesc'), trigger: 'contacts' },
              { value: 'Health Beauty products', label: t('healthBeauty.theDesc'), trigger: 'contacts' },
              { value: 'Electronics products', label: t('electronics.theDesc'), trigger: 'contacts' },
              { value: 'School Tools products', label: t('schoolTools.theDesc'), trigger: 'contacts' },
          ],
      },
      {
          id: 'contacts',
          message: t('chat.contactInfo'),
          trigger: 'thankYou'
      },
      {
          id: 'thankYou',
          message: t('chat.thankYou'),
          end: true
      },                                                
  ]

  // Component Theme
  const themes = {
      background: colors.grey[700],
      width: "100%",
      boxShadow: "var(--shadow-dark-color)",
      border: "1px solid var(--color-primary-variant)",
      fontFamily: 'Helvetica Neue',
      fontWeight: "bold",
      headerBgColor: "var(--color-bg-variant)",
      headerFontColor: colors.grey[500],
      headerFontSize: '12px',
      botBubbleColor: "var(--color-bg-variant)",
      botFontColor: colors.grey[500],
      userBubbleColor: colors.grey[500],
      userFontColor: colors.grey[500],
    };
  return (
    <div id='chat-container' className="chat-container" ref={ref}>
      <ThemeProvider theme={themes}>
        <Segment floated="left">
          {steps.length > 0 && (
            <ChatBotComponent
              key={i18n.language} // Force re-render when language changes
              steps={steps}
              colors={colors}
            />
          )}
        </Segment>
      </ThemeProvider>
    </div>
  )
}

export default Chat
