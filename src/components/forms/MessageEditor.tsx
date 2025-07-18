"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Message, MessageSender } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface MessageEditorProps {
  message: Message;
  onSave: (message: Message) => void;
  onCancel: (message: Message) => void;
  disabled?: boolean;
}

export function MessageEditor({ message, onSave, onCancel, disabled = false }: MessageEditorProps) {
  const [content, setContent] = useState(message.content);
  const [sender, setSender] = useState<MessageSender>(message.sender);
  const [timestamp, setTimestamp] = useState(message.timestamp);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update local state when message prop changes
  useEffect(() => {
    setContent(message.content);
    setSender(message.sender);
    setTimestamp(message.timestamp);
  }, [message]);

  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleSenderChange = (newSender: MessageSender) => {
    setSender(newSender);
  };

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimestamp = new Date(e.target.value);
    setTimestamp(newTimestamp);
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!content.trim()) {
      newErrors.content = "Message content cannot be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedMessage: Message = {
      ...message,
      content: content.trim(),
      sender,
      timestamp,
    };

    onSave(updatedMessage);
  };

  const handleCancel = () => {
    onCancel(message);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      {/* Message Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Message Content
        </label>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Enter message content..."
          disabled={disabled}
          rows={3}
          className={cn(
            "block w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:text-gray-100 dark:placeholder-gray-400 resize-none",
            errors.content
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400",
            "bg-white dark:bg-gray-800"
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.content}</p>
        )}
      </div>

      {/* Sender Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sender</label>
        <div className="flex space-x-2">
          <Button
            onClick={() => handleSenderChange("user")}
            disabled={disabled}
            variant={sender === "user" ? "primary" : "outline"}
            size="sm"
            className="flex-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            You
          </Button>
          <Button
            onClick={() => handleSenderChange("contact")}
            disabled={disabled}
            variant={sender === "contact" ? "primary" : "outline"}
            size="sm"
            className="flex-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Contact
          </Button>
        </div>
      </div>

      {/* Timestamp */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Timestamp
        </label>
        <input
          type="datetime-local"
          value={formatDateTimeLocal(timestamp)}
          onChange={handleTimestampChange}
          disabled={disabled}
          className={cn(
            "block w-full rounded-lg border px-3 py-2 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:text-gray-100",
            "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400",
            "bg-white dark:bg-gray-800"
          )}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-2">
        <Button onClick={handleCancel} disabled={disabled} variant="outline" size="sm">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={disabled} size="sm">
          Save
        </Button>
      </div>
    </motion.div>
  );
}
