"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, TwitterConfig, Theme } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface TwitterPreviewProps {
  chatData: ChatData;
  config: TwitterConfig;
  theme: Theme;
  className?: string;
}

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  config: TwitterConfig;
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
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-2`}
    >
      <div style={{ maxWidth: config.layout.maxBubbleWidth }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="text-sm leading-5"
          style={{
            backgroundColor: isUser ? config.colors.userBubble : config.colors.contactBubble,
            color: isUser ? "#FFFFFF" : config.colors.text,
            fontFamily: config.typography.fontFamily,
            fontSize: config.typography.messageSize,
            padding: config.layout.padding.message,
            borderRadius: config.layout.bubbleRadius,
            wordWrap: "break-word",
            wordBreak: "break-word",
            marginBottom: "2px",
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
              className={`text-xs ${isUser ? "text-right" : "text-left"}`}
              style={{
                fontSize: "11px",
                fontFamily: config.typography.fontFamily,
                color: config.colors.textSecondary,
                marginTop: "2px",
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

const TwitterHeader: React.FC<{
  contactName: string;
  contactImage: string | null;
  config: TwitterConfig;
}> = ({ contactName, contactImage, config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between"
      style={{
        backgroundColor: config.colors.background,
        padding: "16px 16px",
        height: "80px",
      }}
    >
      {/* Left - Back arrow */}
      <motion.div className="cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: config.colors.text }}
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

      {/* Center - Profile info */}
      <div className="flex flex-col items-center justify-center flex-1">
        <motion.div
          className="relative mb-2"
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
                className="w-full h-full rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{
                  backgroundColor: "#8B5A3C",
                }}
              >
                {contactName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </motion.div>

        <div
          className="font-medium text-center"
          style={{
            color: config.colors.text,
            fontFamily: config.typography.fontFamily,
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {contactName}
        </div>
      </div>

      {/* Right - Action buttons */}
      <div className="flex items-center space-x-3">
        {/* Camera icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.textSecondary }}
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Phone icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.textSecondary }}
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
      </div>
    </motion.div>
  );
};

const TwitterFooter: React.FC<{ config: TwitterConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        height: "64px",
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
            backgroundColor: "#E5E5EA",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: config.colors.textSecondary }}
          >
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
          backgroundColor: "#E5E5EA",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
        whileHover={{ backgroundColor: "#DCDCE0" }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: "15px",
            color: config.colors.textSecondary,
          }}
        >
          Start a message
        </div>
      </motion.div>

      {/* Voice message icon */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "#1D9BF0" }}>
          <rect
            x="9"
            y="2"
            width="6"
            height="12"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 10V12C5 16.4183 8.58172 20 13 20H11C15.4183 20 19 16.4183 19 12V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="20"
            x2="12"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export const TwitterPreview: React.FC<TwitterPreviewProps> = ({
  chatData,
  config,
  theme,
  className = "",
}) => {
  const { contactName, contactImage, messages } = chatData;

  // Empty state
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
          minHeight: "600px",
        }}
      >
        <TwitterHeader
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
            minHeight: "456px",
            maxHeight: "456px",
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
                style={{ color: config.colors.textSecondary }}
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
        <TwitterFooter config={config} />
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${contactName}-${messages.length}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full max-w-sm mx-auto overflow-hidden ${className}`}
      style={{
        backgroundColor: config.colors.background,
        borderRadius: "12px",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <TwitterHeader
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
          minHeight: "456px",
          maxHeight: "456px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="space-y-1">
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
      <TwitterFooter config={config} />
    </motion.div>
  );
};

export default TwitterPreview;
