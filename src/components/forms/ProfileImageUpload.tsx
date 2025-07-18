"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileUpload } from "@/components/ui/FileUpload";

interface ProfileImageUploadProps {
  label: string;
  preview: string | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
  error?: string;
}

export function ProfileImageUpload({
  label,
  preview,
  onFileSelect,
  disabled = false,
  error,
}: ProfileImageUploadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>

      <FileUpload
        onFileSelect={onFileSelect}
        accept="image/*"
        maxSize={5 * 1024 * 1024} // 5MB
        preview={preview}
        disabled={disabled}
        label="Upload Profile Image"
        error={error}
        className="h-32"
      />

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Recommended: Square image, at least 200x200px
      </p>
    </motion.div>
  );
}
