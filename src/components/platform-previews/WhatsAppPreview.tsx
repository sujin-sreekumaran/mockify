"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, WhatsAppConfig } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface WhatsAppPreviewProps {
  chatData: ChatData;
  config: WhatsAppConfig;
  className?: string;
}

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  config: WhatsAppConfig;
  showTimestamp?: boolean;
  index: number;
}

const MessageStatusIcon: React.FC<{ isUser: boolean; config: WhatsAppConfig }> = ({
  isUser,
  config,
}) => {
  if (!isUser) return null;

  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 16 10"
      fill="none"
      style={{ color: config.colors.primary, display: "inline" }}
    >
      <path
        d="M1.5 5L4.5 8L8.5 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 5L8.5 8L12.5 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative"
          style={{
            backgroundColor: isUser ? config.colors.userBubble : config.colors.contactBubble,
            color: config.colors.text,
            fontFamily: config.typography.fontFamily,
            fontSize: "15px",
            padding: "6px 7px 8px 9px",
            borderRadius: "7.5px",
            wordWrap: "break-word",
            wordBreak: "break-word",
            boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.13)",
            position: "relative",
          }}
        >
          {/* Message content with space for timestamp */}
          <div
            className="text-sm leading-5"
            style={{
              paddingRight: "60px",
              paddingBottom: "4px",
              minHeight: "20px",
            }}
          >
            {content}
          </div>

          {/* Timestamp positioned at bottom-right */}
          <div
            className="absolute bottom-1 right-2 flex items-center text-xs"
            style={{
              fontSize: "11px",
              color: isUser ? "#4A5568" : "#8696A0",
              fontFamily: config.typography.fontFamily,
              whiteSpace: "nowrap",
            }}
          >
            {formatTimestamp(timestamp, "12h")}
            {isUser && (
              <span className="ml-1">
                <MessageStatusIcon isUser={isUser} config={config} />
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WhatsAppHeader: React.FC<{
  contactName: string;
  contactImage: string | null;
  config: WhatsAppConfig;
}> = ({ contactName, contactImage, config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
      style={{
        backgroundColor: "#128C7E", // Darker green header
        padding: "12px 16px",
        height: "64px",
      }}
    >
      {/* Back arrow */}
      <motion.div
        className="mr-4 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
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
            width: "42px",
            height: "42px",
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
                backgroundColor: "#075E54",
              }}
            >
              {contactName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </motion.div>

      {/* Contact info */}
      <div className="flex-1">
        <div
          className="font-medium text-white"
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "22px",
          }}
        >
          {contactName}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-6">
        {/* Video call icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
            <path
              d="M23 7L16 12L23 17V7Z"
              stroke="currentColor"
              strokeWidth="2"
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Voice call icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
            <path
              d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.93 21 3 13.07 3 3.08C3 2.48 3.48 2 4.08 2H7.09C7.69 2 8.09 2.48 8.09 3.08C8.09 4.58 8.34 6.03 8.81 7.38C8.94 7.78 8.81 8.22 8.48 8.48L6.9 9.6C8.07 12.33 11.67 15.93 14.4 17.1L15.52 15.52C15.78 15.19 16.22 15.06 16.62 15.19C17.97 15.66 19.42 15.91 20.92 15.91C21.52 15.91 22 16.32 22 16.92Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WhatsAppFooter: React.FC<{ config: WhatsAppConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center"
      style={{
        backgroundColor: "#F7F8FA",
        padding: "8px 16px",
        height: "64px",
      }}
    >
      {/* Plus icon */}
      <motion.div
        className="mr-3 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="28"
          height="28"
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
      </motion.div>

      {/* Message input */}
      <motion.div
        className="flex-1 rounded-full px-4 py-2 mr-3 cursor-text flex items-center"
        style={{
          backgroundColor: "white",
          height: "44px",
          border: "1px solid #E1E5E9",
        }}
        whileHover={{ backgroundColor: "#FAFAFA" }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: "16px",
            color: config.colors.textSecondary,
          }}
        >
          Type a message
        </div>
      </motion.div>

      {/* Emoji icon */}
      <motion.div
        className="mr-3 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: config.colors.textSecondary }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14S9.5 16 12 16S16 14 16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="9"
            y1="9"
            x2="9.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="15"
            y1="9"
            x2="15.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Camera icon */}
      <motion.div
        className="mr-3 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: config.colors.textSecondary }}
        >
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Microphone icon */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
        <svg
          width="28"
          height="28"
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

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({
  chatData,
  config,
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
          border: "0.5px solid #E0E0E0",
          minHeight: "600px",
        }}
      >
        <WhatsAppHeader
          contactName={contactName || "Contact"}
          contactImage={contactImage}
          config={config}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
          style={{
            backgroundColor: config.colors.background,
            padding: config.layout.padding.container,
            minHeight: "480px",
            maxHeight: "480px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="flex-1 flex items-center justify-center">
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
          </div>
        </motion.div>
        <WhatsAppFooter config={config} />
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
        border: "0.5px solid #E0E0E0",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <WhatsAppHeader
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
      <WhatsAppFooter config={config} />
    </motion.div>
  );
};

export default WhatsAppPreview;
