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
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileSelect = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onFileSelect(file);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>

      <motion.div
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-3 text-center transition-all duration-200 ${
          isDragOver && !disabled
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${
          error ? "border-red-300 dark:border-red-600" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {isLoading ? (
          <div className="flex flex-col items-center py-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mb-2"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400">Processing...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-16 w-16 rounded-lg object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              type="button"
            >
              ×
            </motion.button>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Click to change</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2">
            <motion.div
              animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
              className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </motion.div>
            <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Upload Image</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click or drag to upload</p>
          </div>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">Square image, at least 200x200px</p>
    </motion.div>
  );
}
