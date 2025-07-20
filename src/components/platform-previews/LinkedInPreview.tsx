"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, LinkedInConfig, Theme } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface LinkedInPreviewProps {
  chatData: ChatData;
  config: LinkedInConfig;
  theme: Theme;
  className?: string;
}

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  config: LinkedInConfig;
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
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1`}
    >
      <div style={{ maxWidth: config.layout.maxBubbleWidth }}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={`text-sm leading-5 ${isUser ? "text-white" : "text-gray-900"}`}
          style={{
            backgroundColor: isUser ? config.colors.userBubble : config.colors.contactBubble,
            fontFamily: config.typography.fontFamily,
            fontSize: config.typography.messageSize,
            padding: config.layout.padding.message,
            borderRadius: config.layout.bubbleRadius,
            boxShadow: isUser
              ? "0 1px 3px rgba(10, 102, 194, 0.2)"
              : "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: isUser ? "none" : "1px solid #E0E0E0",
            wordWrap: "break-word",
            wordBreak: "break-word",
            fontWeight: config.typography.fontWeight.normal,
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

const LinkedInHeader: React.FC<{
  contactName: string;
  contactImage: string | null;
  config: LinkedInConfig;
}> = ({ contactName, contactImage, config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center border-b"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: "1px",
        height: "64px",
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

      {/* Profile image */}
      <motion.div
        className="relative mr-3"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full border-2"
          style={{
            width: config.layout.avatarSize,
            height: config.layout.avatarSize,
            borderColor: "#E0E0E0",
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
              style={{ backgroundColor: config.colors.primary }}
            >
              {contactName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Online status indicator */}
        {config.features.hasOnlineStatus && (
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: config.colors.accent }}
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
            fontSize: config.typography.nameSize,
            fontWeight: config.typography.fontWeight.medium,
            lineHeight: "20px",
          }}
        >
          {contactName}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-3">
        {/* Video call icon */}
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

        {/* More options */}
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
            style={{ color: config.colors.text }}
          >
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="19" cy="12" r="1" fill="currentColor" />
            <circle cx="5" cy="12" r="1" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

const LinkedInFooter: React.FC<{ config: LinkedInConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center border-t"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        borderTopColor: "#E0E0E0",
        borderTopWidth: "1px",
        height: "60px",
      }}
    >
      {/* Attachment icon */}
      <motion.div
        className="mr-3 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: config.colors.textSecondary }}
        >
          <path
            d="M21.44 11.05L12.25 20.24C11.12 21.37 9.59 22 7.99 22C6.39 22 4.86 21.37 3.73 20.24C2.6 19.11 1.97 17.58 1.97 15.98C1.97 14.38 2.6 12.85 3.73 11.72L12.92 2.53C13.68 1.77 14.71 1.35 15.78 1.35C16.85 1.35 17.88 1.77 18.64 2.53C19.4 3.29 19.82 4.32 19.82 5.39C19.82 6.46 19.4 7.49 18.64 8.25L10.17 16.72C9.79 17.1 9.28 17.31 8.75 17.31C8.22 17.31 7.71 17.1 7.33 16.72C6.95 16.34 6.74 15.83 6.74 15.3C6.74 14.77 6.95 14.26 7.33 13.88L15.07 6.14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Message input */}
      <motion.div
        className="flex-1 rounded-full px-4 py-2 mr-3 cursor-text"
        style={{
          backgroundColor: "#F3F2EF",
          border: "1px solid #E0E0E0",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
        whileHover={{ backgroundColor: "#EEEEEE" }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: "14px",
            color: config.colors.textSecondary,
          }}
        >
          Write a message...
        </div>
      </motion.div>

      {/* Send button */}
      <motion.div
        className="cursor-pointer rounded-full p-2"
        style={{
          backgroundColor: config.colors.primary,
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        whileHover={{ scale: 1.05, backgroundColor: config.colors.secondary }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
          <line
            x1="22"
            y1="2"
            x2="11"
            y2="13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="22,2 15,22 11,13 2,9 22,2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
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
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid #E0E0E0",
          minHeight: "600px",
        }}
      >
        <LinkedInHeader
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
            minHeight: "476px",
            maxHeight: "476px",
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
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  backgroundColor: config.colors.primary,
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: "white" }}
                >
                  <path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
            <p className="text-base font-medium mb-2">Start a professional conversation</p>
            <p className="text-sm">Add messages to see your LinkedIn chat preview</p>
          </div>
        </motion.div>
        <LinkedInFooter config={config} />
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
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid #E0E0E0",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <LinkedInHeader
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
          minHeight: "476px",
          maxHeight: "476px",
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
      <LinkedInFooter config={config} />
    </motion.div>
  );
};

export default LinkedInPreview;
