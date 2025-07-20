"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message, MessageSender } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MessageEditor } from "./MessageEditor";
import { cn } from "@/lib/utils";

interface MessageListManagerProps {
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
  error?: string;
  disabled?: boolean;
}

export function MessageListManager({
  messages,
  onMessagesChange,
  error,
  disabled = false,
}: MessageListManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const generateId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddMessage = useCallback(() => {
    const newMessage: Message = {
      id: generateId(),
      content: "",
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    onMessagesChange([...messages, newMessage]);
    setEditingId(newMessage.id);
    setIsAddingNew(true);
  }, [messages, onMessagesChange]);

  const handleUpdateMessage = useCallback(
    (updatedMessage: Message) => {
      const updatedMessages = messages.map((msg) =>
        msg.id === updatedMessage.id ? updatedMessage : msg
      );
      onMessagesChange(updatedMessages);
    },
    [messages, onMessagesChange]
  );

  const handleDeleteMessage = useCallback(
    (messageId: string) => {
      const filteredMessages = messages.filter((msg) => msg.id !== messageId);
      onMessagesChange(filteredMessages);

      if (editingId === messageId) {
        setEditingId(null);
        setIsAddingNew(false);
      }
    },
    [messages, onMessagesChange, editingId]
  );

  const handleStartEdit = useCallback((messageId: string) => {
    setEditingId(messageId);
    setIsAddingNew(false);
  }, []);

  const handleSaveEdit = useCallback(
    (message: Message) => {
      // If content is empty and this was a new message, delete it
      if (!message.content.trim() && isAddingNew) {
        handleDeleteMessage(message.id);
      } else if (message.content.trim()) {
        handleUpdateMessage(message);
      }

      setEditingId(null);
      setIsAddingNew(false);
    },
    [handleUpdateMessage, handleDeleteMessage, isAddingNew]
  );

  const handleCancelEdit = useCallback(
    (message: Message) => {
      // If this was a new message being added, remove it
      if (isAddingNew) {
        handleDeleteMessage(message.id);
      }

      setEditingId(null);
      setIsAddingNew(false);
    },
    [handleDeleteMessage, isAddingNew]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Messages List */}
      <div className="space-y-3 max-h-[32rem] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "p-4 rounded-lg border",
                message.sender === "user"
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              )}
            >
              {editingId === message.id ? (
                <MessageEditor
                  message={message}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                  disabled={disabled}
                />
              ) : (
                <MessageDisplay
                  message={message}
                  index={index}
                  onEdit={() => handleStartEdit(message.id)}
                  onDelete={() => handleDeleteMessage(message.id)}
                  disabled={disabled}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Message Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleAddMessage}
          disabled={disabled || editingId !== null}
          variant="outline"
          className="w-full max-w-xs"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Message
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400 text-center"
        >
          {error}
        </motion.p>
      )}

      {/* Messages Count */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {messages.length} message{messages.length !== 1 ? "s" : ""}
      </p>
    </motion.div>
  );
}

interface MessageDisplayProps {
  message: Message;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}

function MessageDisplay({ message, index, onEdit, onDelete, disabled }: MessageDisplayProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">#{index + 1}</span>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              message.sender === "user"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
            )}
          >
            {message.sender === "user" ? "You" : "Contact"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            onClick={onEdit}
            disabled={disabled}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button
            onClick={onDelete}
            disabled={disabled}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-900 dark:text-gray-100 break-words">
        {message.content || <span className="italic text-gray-500">Empty message</span>}
      </p>
    </div>
  );
}
