"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatData, Message, ChatEditorProps } from "@/types";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { ContactNameInput } from "./ContactNameInput";
import { MessageListManager } from "./MessageListManager";
import { cn } from "@/lib/utils";

export function ChatEditor({
  chatData,
  onChatDataChange,
  disabled = false,
  className,
}: ChatEditorProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContactNameChange = useCallback(
    (contactName: string) => {
      // Clear contact name error when user starts typing
      if (errors.contactName) {
        setErrors((prev) => ({ ...prev, contactName: "" }));
      }

      onChatDataChange({
        ...chatData,
        contactName,
      });
    },
    [chatData, onChatDataChange, errors.contactName]
  );

  const handleContactImageChange = useCallback(
    (file: File | null) => {
      let contactImage: string | null = null;

      if (file) {
        contactImage = URL.createObjectURL(file);
      }

      onChatDataChange({
        ...chatData,
        contactImage,
      });
    },
    [chatData, onChatDataChange]
  );

  const handleUserImageChange = useCallback(
    (file: File | null) => {
      let userImage: string | null = null;

      if (file) {
        userImage = URL.createObjectURL(file);
      }

      onChatDataChange({
        ...chatData,
        userImage,
      });
    },
    [chatData, onChatDataChange]
  );

  const handleMessagesChange = useCallback(
    (messages: Message[]) => {
      onChatDataChange({
        ...chatData,
        messages,
      });
    },
    [chatData, onChatDataChange]
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!chatData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (chatData.messages.length === 0) {
      newErrors.messages = "At least one message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [chatData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Chat Details</h3>

        {/* Profile Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileImageUpload
            label="Contact Profile Image"
            preview={chatData.contactImage}
            onFileSelect={handleContactImageChange}
            disabled={disabled}
          />

          <ProfileImageUpload
            label="Your Profile Image"
            preview={chatData.userImage}
            onFileSelect={handleUserImageChange}
            disabled={disabled}
          />
        </div>

        {/* Contact Name Input */}
        <ContactNameInput
          value={chatData.contactName}
          onChange={handleContactNameChange}
          error={errors.contactName}
          disabled={disabled}
        />
      </div>

      {/* Messages Section */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">Messages</h4>

        <MessageListManager
          messages={chatData.messages}
          onMessagesChange={handleMessagesChange}
          error={errors.messages}
          disabled={disabled}
        />
      </div>
    </motion.div>
  );
}
