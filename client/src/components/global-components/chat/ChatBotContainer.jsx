import React from 'react';
import { Box } from '@mui/material';
import Chat from "./Chat";
import "./chatBot.css";
export const ChatBotContainer = () => {

  return (
    <Box className="chat-bot-container">
      {/* <motion.div
        onClick={() => {
          setShow(!show);
        }}
        whileTap={{ scale: 1.02 }}
        className="chat-icon-container"
      >
        {show ? 
          <Tooltip title="Close chatBot">
            <span className="cursor-pointer">
              <IconComponent        
                icon={
                  <IoClose
                    className="chat-icon"
                    style={{
                      color: "var(--color-bg-variant)",
                      border: "1px dashed var(--color-bg-variant)",
                      backgroundColor: "white",
                      padding: "9px",
                      borderRadius: "50%",
                    }} 
                  />
                } 
              />
            </span>
          </Tooltip>
          : 
          <Tooltip title="Open chatBot">
            <span className="cursor-pointer">
              <IconComponent        
                icon={
                  <SiChatbot 
                    className="chat-icon"
                    style={{
                      color: "var(--color-bg-variant)",
                      border: "1px dashed var(--color-bg-variant)",
                      backgroundColor: "white",
                      padding: "9px",
                      borderRadius: "50%",
                    }} 
                  />
                } 
              />
            </span>
          </Tooltip>
        }
      </motion.div>
      <AnimatePresence>
        {show && <Chat />}
      </AnimatePresence> */}
      <Chat key="chat" />
    </Box>
  );
}