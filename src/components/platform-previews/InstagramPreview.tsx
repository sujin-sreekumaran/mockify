"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, InstagramConfig, Theme } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface InstagramPreviewProps {
  chatData: ChatData;
  config: InstagramConfig;
  theme: Theme;
  className?: string;
}

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  config: InstagramConfig;
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
            boxShadow: isUser ? "0 1px 2px rgba(228, 64, 95, 0.2)" : "0 1px 2px rgba(0, 0, 0, 0.1)",
            border: isUser ? "none" : "1px solid #E5E5E5",
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

const InstagramHeader: React.FC<{
  contactName: string;
  contactImage: string | null;
  config: InstagramConfig;
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
        borderBottomColor: "#DBDBDB",
        borderBottomWidth: "0.5px",
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

      {/* Profile image with story ring */}
      <motion.div
        className="relative mr-3"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full"
          style={{
            width: "32px",
            height: "32px",
            background: config.features.hasStoryRing
              ? `linear-gradient(45deg, ${config.colors.gradient?.from || config.colors.primary}, ${
                  config.colors.gradient?.to || config.colors.secondary
                })`
              : "transparent",
            padding: config.features.hasStoryRing ? "2px" : "0",
          }}
        >
          <div
            className="w-full h-full rounded-full bg-white"
            style={{ padding: config.features.hasStoryRing ? "2px" : "0" }}
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
                style={{ backgroundColor: config.colors.textSecondary }}
              >
                {contactName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Contact info */}
      <div className="flex-1">
        <div
          className="font-semibold"
          style={{
            color: config.colors.text,
            fontFamily: config.typography.fontFamily,
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "20px",
          }}
        >
          {contactName}
        </div>
        {config.features.hasOnlineStatus && (
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
      <div className="flex items-center space-x-5">
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
            style={{ color: config.colors.text }}
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
            style={{ color: config.colors.text }}
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
            style={{ color: config.colors.text }}
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

const InstagramFooter: React.FC<{ config: InstagramConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center border-t"
      style={{
        backgroundColor: config.colors.background,
        padding: "12px 16px",
        borderTopColor: "#DBDBDB",
        borderTopWidth: "0.5px",
        height: "60px",
      }}
    >
      {/* Camera icon */}
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

      {/* Message input */}
      <motion.div
        className="flex-1 rounded-full px-4 py-2 mr-3 cursor-text"
        style={{
          backgroundColor: "#F0F0F0",
          border: "1px solid #DBDBDB",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
        whileHover={{ backgroundColor: "#EBEBEB" }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: "14px",
            color: config.colors.textSecondary,
          }}
        >
          Message...
        </div>
      </motion.div>

      {/* Additional icons */}
      <div className="flex items-center space-x-4">
        {/* Microphone icon */}
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
              x="9"
              y="2"
              width="6"
              height="12"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 10V12C5 16.4183 8.58172 20 13 20H11C15.4183 20 19 16.4183 19 12V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="20"
              x2="12"
              y2="22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Image icon */}
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

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({
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
          border: "0.5px solid #DBDBDB",
          minHeight: "600px",
        }}
      >
        <InstagramHeader
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
        <InstagramFooter config={config} />
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
        border: "0.5px solid #DBDBDB",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <InstagramHeader
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
      <InstagramFooter config={config} />
    </motion.div>
  );
};

export default InstagramPreview;
