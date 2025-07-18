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
        delay: index * 0.05, // Staggered animation
        ease: "easeOut",
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1`}
    >
      <div style={{ maxWidth: config.layout.maxBubbleWidth }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`text-sm leading-5 ${isUser ? "text-white" : ""}`}
          style={{
            backgroundColor: isUser ? config.colors.userBubble : config.colors.contactBubble,
            color: isUser ? "#FFFFFF" : config.colors.text,
            fontFamily: config.typography.fontFamily,
            fontSize: config.typography.messageSize,
            padding: config.layout.padding.message,
            borderRadius: config.layout.bubbleRadius,
            boxShadow: isUser
              ? "0 1px 3px rgba(29, 161, 242, 0.2)"
              : "0 1px 2px rgba(0, 0, 0, 0.1)",
            border: isUser ? "none" : "1px solid #E1E8ED",
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
      className="flex items-center border-b"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        borderBottomColor: "#E1E8ED",
        borderBottomWidth: "1px",
        height: "60px",
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
              style={{
                border: "2px solid #E1E8ED",
              }}
            />
          ) : (
            <div
              className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-medium"
              style={{
                backgroundColor: config.colors.textSecondary,
                border: "2px solid #E1E8ED",
              }}
            >
              {contactName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </motion.div>

      {/* Contact info */}
      <div className="flex-1">
        <div className="flex items-center">
          <div
            className="font-bold"
            style={{
              color: config.colors.text,
              fontFamily: config.typography.fontFamily,
              fontSize: "16px",
              fontWeight: config.typography.fontWeight.bold,
              lineHeight: "20px",
            }}
          >
            {contactName}
          </div>
          {config.features.hasVerifiedBadge && (
            <motion.div
              className="ml-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={config.colors.primary}>
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </motion.div>
          )}
        </div>
        <div
          className="text-sm"
          style={{
            color: config.colors.textSecondary,
            fontFamily: config.typography.fontFamily,
            fontSize: "14px",
            lineHeight: "16px",
          }}
        >
          @{contactName.toLowerCase().replace(/\s+/g, "")}
        </div>
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
            style={{ color: config.colors.textSecondary }}
          >
            <path
              d="M22 16.92V7.08C22 6.61 21.74 6.19 21.33 6.01L12.67 2.34C12.26 2.16 11.74 2.16 11.33 2.34L2.67 6.01C2.26 6.19 2 6.61 2 7.08V16.92C2 17.39 2.26 17.81 2.67 17.99L11.33 21.66C11.74 21.84 12.26 21.84 12.67 21.66L21.33 17.99C21.74 17.81 22 17.39 22 16.92Z"
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
            style={{ color: config.colors.textSecondary }}
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

const TwitterFooter: React.FC<{ config: TwitterConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center border-t"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        borderTopColor: "#E1E8ED",
        borderTopWidth: "1px",
        height: "60px",
      }}
    >
      {/* Message input */}
      <motion.div
        className="flex-1 rounded-full px-4 py-2 mr-3 cursor-text"
        style={{
          backgroundColor: "#F7F9FA",
          border: "1px solid #E1E8ED",
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
        whileHover={{ backgroundColor: "#F0F3F4" }}
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

      {/* Additional icons */}
      <div className="flex items-center space-x-3">
        {/* Media icon */}
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
            style={{ color: config.colors.textSecondary }}
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="8.5"
              cy="8.5"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 15L16 10L5 21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* GIF icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <div
            style={{
              fontFamily: config.typography.fontFamily,
              fontSize: "12px",
              fontWeight: config.typography.fontWeight.bold,
              color: config.colors.textSecondary,
              border: `1px solid ${config.colors.textSecondary}`,
              borderRadius: "4px",
              padding: "2px 4px",
              lineHeight: "1",
            }}
          >
            GIF
          </div>
        </motion.div>

        {/* Emoji icon */}
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
            style={{ color: config.colors.textSecondary }}
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
      </div>
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

  // Empty state with smooth animations
  if (!contactName || messages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-full max-w-sm mx-auto overflow-hidden ${className}`}
        style={{
          backgroundColor: config.colors.background,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #E1E8ED",
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
      key={`${contactName}-${messages.length}`} // Re-animate when data changes
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full max-w-sm mx-auto overflow-hidden ${className}`}
      style={{
        backgroundColor: config.colors.background,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #E1E8ED",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <TwitterHeader contactName={contactName} contactImage={contactImage} config={config} />

      {/* Messages Container */}
      <motion.div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{
          backgroundColor: config.colors.background,
          padding: "16px",
          minHeight: "480px",
          maxHeight: "480px",
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
      <TwitterFooter config={config} />
    </motion.div>
  );
};

export default TwitterPreview;
