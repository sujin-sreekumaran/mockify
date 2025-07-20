"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, TinderConfig, Theme } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface TinderPreviewProps {
  chatData: ChatData;
  config: TinderConfig;
  theme: Theme;
  className?: string;
}

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  config: TinderConfig;
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
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div style={{ maxWidth: config.layout.maxBubbleWidth }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`text-base leading-6 ${isUser ? "text-white" : "text-gray-900"}`}
          style={{
            backgroundColor: isUser ? config.colors.userBubble : config.colors.contactBubble,
            fontFamily: config.typography.fontFamily,
            fontSize: config.typography.messageSize,
            padding: config.layout.padding.message,
            borderRadius: config.layout.bubbleRadius,
            boxShadow: isUser
              ? "0 2px 8px rgba(253, 80, 104, 0.25)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: isUser ? "none" : "1px solid #F0F0F0",
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
              className={`text-xs mt-2 px-1 ${isUser ? "text-right" : "text-left"}`}
              style={{
                fontSize: config.typography.timestampSize,
                fontFamily: config.typography.fontFamily,
                color: config.colors.textSecondary,
                marginTop: "6px",
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

const TinderHeader: React.FC<{
  contactName: string;
  contactImage: string | null;
  config: TinderConfig;
}> = ({ contactName, contactImage, config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
      style={{
        background: `linear-gradient(135deg, ${
          config.colors.gradient?.from || config.colors.primary
        }, ${config.colors.gradient?.to || config.colors.secondary})`,
        padding: "16px 20px",
        height: "70px",
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Profile image with modern styling */}
      <motion.div
        className="relative mr-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full border-2 border-white/30"
          style={{
            width: config.layout.avatarSize,
            height: config.layout.avatarSize,
            padding: "2px",
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
              className="w-full h-full rounded-full flex items-center justify-center text-white text-lg font-medium"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
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
          className="font-semibold text-white"
          style={{
            fontFamily: config.typography.fontFamily,
            fontSize: config.typography.nameSize,
            fontWeight: config.typography.fontWeight.bold,
            lineHeight: "22px",
          }}
        >
          {contactName}
        </div>
        {config.features.hasMatchInfo && (
          <div
            className="text-sm text-white/80"
            style={{
              fontFamily: config.typography.fontFamily,
              fontSize: "14px",
              lineHeight: "18px",
            }}
          >
            You matched on 7/20/25
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        {/* Video call icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
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

        {/* More options */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="19" cy="12" r="1" fill="currentColor" />
            <circle cx="5" cy="12" r="1" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TinderFooter: React.FC<{ config: TinderConfig }> = ({ config }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center"
      style={{
        backgroundColor: config.colors.background,
        padding: "16px 20px",
        borderTop: "1px solid #F0F0F0",
        height: "70px",
      }}
    >
      {/* Message input with modern styling */}
      <motion.div
        className="flex-1 rounded-full px-5 py-3 mr-4 cursor-text"
        style={{
          backgroundColor: "#F8F8F8",
          border: "1px solid #E8E8E8",
          height: "44px",
          display: "flex",
          alignItems: "center",
        }}
        whileHover={{ backgroundColor: "#F0F0F0" }}
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

      {/* Send button with gradient */}
      <motion.div
        className="cursor-pointer rounded-full p-3"
        style={{
          background: `linear-gradient(135deg, ${
            config.colors.gradient?.from || config.colors.primary
          }, ${config.colors.gradient?.to || config.colors.secondary})`,
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
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

export const TinderPreview: React.FC<TinderPreviewProps> = ({
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
        className={`w-full max-w-md mx-auto overflow-hidden ${className}`}
        style={{
          backgroundColor: config.colors.background,
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(253, 80, 104, 0.15)",
          border: "0.5px solid #F0F0F0",
          minHeight: "600px",
        }}
      >
        <TinderHeader
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
            minHeight: "460px",
            maxHeight: "460px",
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
                  background: `linear-gradient(135deg, ${
                    config.colors.gradient?.from || config.colors.primary
                  }, ${config.colors.gradient?.to || config.colors.secondary})`,
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
            <p className="text-base font-medium mb-2">Start the conversation!</p>
            <p className="text-sm">Add messages to see your chat preview</p>
          </div>
        </motion.div>
        <TinderFooter config={config} />
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${contactName}-${messages.length}`} // Re-animate when data changes
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full max-w-md mx-auto overflow-hidden ${className}`}
      style={{
        backgroundColor: config.colors.background,
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(253, 80, 104, 0.15)",
        border: "0.5px solid #F0F0F0",
        minHeight: "600px",
        maxHeight: "700px",
      }}
    >
      {/* Header */}
      <TinderHeader
        contactName={contactName || "Contact"}
        contactImage={contactImage}
        config={config}
      />

      {/* Messages Container */}
      <motion.div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{
          backgroundColor: config.colors.background,
          padding: "20px",
          minHeight: "460px",
          maxHeight: "580px",
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
      <TinderFooter config={config} />
    </motion.div>
  );
};

export default TinderPreview;
