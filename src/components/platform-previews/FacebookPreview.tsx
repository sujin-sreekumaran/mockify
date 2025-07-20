"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, FacebookConfig, Theme } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface FacebookPreviewProps {
  chatData: ChatData;
  config: FacebookConfig;
  theme: Theme;
  className?: string;
}

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  config: FacebookConfig;
  showTimestamp?: boolean;
  index: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  isUser,
  timestamp,
  config,
  showTimestamp = false,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05, // Staggered animation
        ease: "easeOut",
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1`}
    >
      <div style={{ maxWidth: config.layout.maxBubbleWidth }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`text-sm leading-5 ${isUser ? "text-white" : "text-gray-900"}`}
          style={{
            backgroundColor: isUser ? config.colors.userBubble : config.colors.contactBubble,
            fontFamily: config.typography.fontFamily,
            fontSize: config.typography.messageSize,
            padding: config.layout.padding.message,
            borderRadius: config.layout.bubbleRadius,
            boxShadow: isUser ? "0 1px 2px rgba(0, 132, 255, 0.2)" : "0 1px 2px rgba(0, 0, 0, 0.1)",
            border: isUser ? "none" : "1px solid #E4E6EA",
            wordWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {content}
        </motion.div>
        <AnimatePresence>
          {showTimestamp && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={`text-xs mt-1 px-1 ${isUser ? "text-right" : "text-left"}`}
              style={{
                fontSize: config.typography.timestampSize,
                fontFamily: config.typography.fontFamily,
                color: config.colors.textSecondary,
                marginTop: "4px",
              }}
            >
              {formatTimestamp(timestamp, config.features.timestampFormat)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FacebookHeader: React.FC<{
  contactName: string;
  contactImage: string | null;
  config: FacebookConfig;
}> = ({ contactName, contactImage, config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        height: "60px",
        borderBottom: "1px solid #E4E6EA",
      }}
    >
      {/* Back arrow */}
      <motion.div
        className="mr-4 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: config.colors.primary }}
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Profile image */}
      <motion.div
        className="relative mr-3"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full"
          style={{
            width: config.layout.avatarSize,
            height: config.layout.avatarSize,
          }}
        >
          {contactImage ? (
            <img
              src={contactImage}
              alt={contactName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: config.colors.primary }}
            >
              {contactName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Active status indicator */}
        {config.features.hasActiveStatus && (
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: "#42B883" }}
          />
        )}
      </motion.div>

      {/* Contact info */}
      <div className="flex-1">
        <div
          className="font-medium"
          style={{
            color: config.colors.text,
            fontFamily: config.typography.fontFamily,
            fontSize: "16px",
            fontWeight: config.typography.fontWeight.medium,
            lineHeight: "20px",
          }}
        >
          {contactName}
        </div>
        {config.features.hasActiveStatus && (
          <div
            className="text-xs"
            style={{
              color: config.colors.textSecondary,
              fontFamily: config.typography.fontFamily,
              fontSize: "12px",
              lineHeight: "16px",
            }}
          >
            Active now
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        {/* Phone icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.primary }}
          >
            <path
              d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.93 21 3 13.07 3 3.08C3 2.48 3.48 2 4.08 2H7.09C7.69 2 8.09 2.48 8.09 3.08C8.09 4.58 8.34 6.03 8.81 7.38C8.94 7.78 8.81 8.22 8.48 8.48L6.9 9.6C8.07 12.33 11.67 15.93 14.4 17.1L15.52 15.52C15.78 15.19 16.22 15.06 16.62 15.19C17.97 15.66 19.42 15.91 20.92 15.91C21.52 15.91 22 16.32 22 16.92Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Video icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.primary }}
          >
            <path
              d="M23 7L16 12L23 17V7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="1"
              y="5"
              width="15"
              height="14"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Info icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.primary }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="16"
              x2="12"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};
const FacebookFooter: React.FC<{ config: FacebookConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        borderTop: "1px solid #E4E6EA",
        height: "60px",
      }}
    >
      {/* Plus icon */}
      <motion.div
        className="mr-3 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: config.colors.primary,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Message input */}
      <motion.div
        className="flex-1 rounded-full px-4 py-2 mr-3 cursor-text"
        style={{
          backgroundColor: "#F0F2F5",
          border: "1px solid #CED0D4",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
        whileHover={{ backgroundColor: "#E4E6EA" }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: "15px",
            color: config.colors.textSecondary,
          }}
        >
          Aa
        </div>
      </motion.div>

      {/* Additional icons */}
      <div className="flex items-center space-x-3">
        {/* Sticker icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.primary }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14S9.5 16 12 16S16 14 16 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="9"
              y1="9"
              x2="9.01"
              y2="9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="15"
              y1="9"
              x2="15.01"
              y2="9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Camera icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.primary }}
          >
            <path
              d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="13"
              r="4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Like/thumbs up icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.primary }}
          >
            <path
              d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9L7 12V20H18.28C18.7623 20.0055 19.2304 19.8364 19.5979 19.524C19.9654 19.2116 20.2077 18.7769 20.28 18.3L21 12H15L14 9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 12H4C3.46957 12 2.96086 12.2107 2.58579 12.5858C2.21071 12.9609 2 13.4696 2 14V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H7V12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const FacebookPreview: React.FC<FacebookPreviewProps> = ({
  chatData,
  config,
  theme,
  className = "",
}) => {
  const { contactName, contactImage, messages } = chatData;

  // Empty state with smooth animations
  if (messages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-full max-w-sm mx-auto overflow-hidden ${className}`}
        style={{
          backgroundColor: config.colors.background,
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          border: "0.5px solid #E4E6EA",
          minHeight: "600px",
        }}
      >
        <FacebookHeader
          contactName={contactName || "Contact"}
          contactImage={contactImage}
          config={config}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
          style={{
            backgroundColor: config.colors.background,
            padding: config.layout.padding.container,
            minHeight: "480px",
            maxHeight: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="text-center"
            style={{
              color: config.colors.textSecondary,
              fontFamily: config.typography.fontFamily,
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-auto mb-4"
                style={{ color: config.colors.primary }}
              >
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <p className="text-sm">Add messages to see preview</p>
          </div>
        </motion.div>
        <FacebookFooter config={config} />
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${contactName}-${messages.length}`} // Re-animate when data changes
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full max-w-sm mx-auto overflow-hidden ${className}`}
      style={{
        backgroundColor: config.colors.background,
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        border: "0.5px solid #E4E6EA",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <FacebookHeader
        contactName={contactName || "Contact"}
        contactImage={contactImage}
        config={config}
      />

      {/* Messages Container */}
      <motion.div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{
          backgroundColor: config.colors.background,
          padding: "16px",
          minHeight: "480px",
          maxHeight: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              const showTimestamp =
                isLastMessage ||
                (index < messages.length - 1 &&
                  new Date(messages[index + 1].timestamp).getTime() -
                    new Date(message.timestamp).getTime() >
                    300000); // 5 minutes

              return (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  isUser={message.sender === "user"}
                  timestamp={new Date(message.timestamp)}
                  config={config}
                  showTimestamp={showTimestamp}
                  index={index}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <FacebookFooter config={config} />
    </motion.div>
  );
};

export default FacebookPreview;
