import React, { useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { IconComponent } from '../header/IconComponent';
import { SiChatbot } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import Chat from "./Chat";
import "./chatBot.css";
import { AnimatePresence, motion } from "framer-motion";

export const ChatBotContainer = () => {
  // ChatBotContainer Showing and Unshowing States
  const [show, setShow] = useState(false);

  return (
    <Box className="chat-bot-container">
      <motion.div // Changed from motion.Box to motion.div
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
        {show && <Chat />} {/* Use conditional rendering instead of ternary for better readability */}
      </AnimatePresence>
    </Box>
  );
}