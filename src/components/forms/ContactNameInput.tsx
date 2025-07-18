"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";

interface ContactNameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function ContactNameInput({
  value,
  onChange,
  error,
  disabled = false,
}: ContactNameInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Input
        label="Contact Name"
        value={value}
        onChange={handleChange}
        placeholder="Enter contact name..."
        error={error}
        disabled={disabled}
        helperText="This will appear as the contact's name in the chat"
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
      />
    </motion.div>
  );
}
