import React from 'react';
import ChatBot from "react-simple-chatbot";
import { RiChatSmileFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const ChatBotComponent = ({ steps, colors }) => {
    // App Context
    const { t, i18n } = useTranslation();

    return (
        <div className="chat-bot-component">
            <ChatBot
                headerTitle={<RiChatSmileFill fontSize={"40px"} />}
                // speechSynthesis={{ enable: true, lang: i18n.language }} // Use current language
                steps={steps}
                inputStyle={{ backgroundColor: colors.grey[900] }} // Apply dynamic input style
                contentStyle={{ backgroundColor: "var(--border-hover-color)" }} // Apply dynamic content style
                placeholder={t("chat.placeholder")} // Dynamic placeholder based on language
                floating={true}
                floatingStyle={{
                    border: "1px dashed var(--color-bg-variant)",
                    backgroundColor: colors.grey[900],
                    fill: "var(--color-primary)", // Apply dynamic floating button color
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.32)", // Apply dynamic shadow style
                    right: i18n.language === 'en' ? '2px' : 'unset',
                    left: i18n.language === 'ar' ? '2px' : 'unset',
                    bottom: '100px',
                }} // Apply dynamic floating button style
            />
        </div>
    );
}

export default ChatBotComponent;