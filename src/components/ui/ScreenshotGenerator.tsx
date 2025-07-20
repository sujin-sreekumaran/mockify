"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import {
  generateScreenshot,
  downloadBlob,
  generateScreenshotFilename,
  validateScreenshotElement,
  prepareElementForScreenshot,
} from "@/lib/screenshot";
import type { ScreenshotGeneratorProps, ScreenshotOptions } from "@/types";

// Icons for the component
const DownloadIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface ScreenshotGeneratorState {
  isGenerating: boolean;
  progress: number;
  status: "idle" | "generating" | "success" | "error";
  error: string | null;
}

export function ScreenshotGenerator({
  targetRef,
  filename,
  onGenerating,
  onSuccess,
  onError,
  className,
  ...props
}: ScreenshotGeneratorProps) {
  const [state, setState] = useState<ScreenshotGeneratorState>({
    isGenerating: false,
    progress: 0,
    status: "idle",
    error: null,
  });

  const updateState = useCallback((updates: Partial<ScreenshotGeneratorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const generateAndDownload = useCallback(async () => {
    if (!targetRef.current) {
      const error = new Error("Target element not found");
      updateState({ status: "error", error: error.message });
      onError?.(error);
      return;
    }

    // Validate element
    const validation = validateScreenshotElement(targetRef.current);
    if (!validation.isValid) {
      const error = new Error(validation.error || "Invalid element");
      updateState({ status: "error", error: error.message });
      onError?.(error);
      return;
    }

    try {
      updateState({
        isGenerating: true,
        status: "generating",
        progress: 0,
        error: null,
      });
      onGenerating?.(true);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 100);

      // Prepare element for screenshot
      const cleanup = prepareElementForScreenshot(targetRef.current);

      try {
        // Small delay to ensure component is fully rendered
        await new Promise(resolve => setTimeout(resolve, 500));

        // Generate screenshot with high quality settings
        const screenshotOptions: ScreenshotOptions = {
          quality: 1.0,
          format: "png",
          scale: 2,
        };

        const result = await generateScreenshot(targetRef.current, screenshotOptions);

        // Complete progress
        clearInterval(progressInterval);
        updateState({ progress: 100 });

        // Generate filename if not provided
        const downloadFilename = filename || generateScreenshotFilename("dm", "png");

        // Download the screenshot
        downloadBlob(result.blob, downloadFilename);

        updateState({
          isGenerating: false,
          status: "success",
          progress: 100,
        });

        onSuccess?.(result.blob);
        onGenerating?.(false);

        // Reset status after success animation
        setTimeout(() => {
          updateState({ status: "idle", progress: 0 });
        }, 2000);
      } finally {
        cleanup();
        clearInterval(progressInterval);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Screenshot generation failed";
      updateState({
        isGenerating: false,
        status: "error",
        error: errorMessage,
        progress: 0,
      });
      onError?.(error instanceof Error ? error : new Error(errorMessage));
      onGenerating?.(false);

      // Reset error status after some time
      setTimeout(() => {
        updateState({ status: "idle", error: null });
      }, 3000);
    }
  }, [targetRef, filename, onGenerating, onSuccess, onError, updateState]);

  const getButtonContent = () => {
    switch (state.status) {
      case "generating":
        return (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            />
            Generating... {state.progress}%
          </>
        );
      case "success":
        return (
          <>
            <CheckIcon />
            <span className="ml-2">Downloaded!</span>
          </>
        );
      case "error":
        return (
          <>
            <ErrorIcon />
            <span className="ml-2">Try Again</span>
          </>
        );
      default:
        return (
          <>
            <DownloadIcon />
            <span className="ml-2">Download Screenshot</span>
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (state.status) {
      case "success":
        return "primary" as const;
      case "error":
        return "destructive" as const;
      default:
        return "primary" as const;
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-3", className)} {...props}>
      <Button
        variant={getButtonVariant()}
        size="lg"
        onClick={generateAndDownload}
        disabled={state.isGenerating}
        loading={state.isGenerating}
        className="min-w-[200px] relative overflow-hidden"
      >
        {getButtonContent()}
      </Button>

      {/* Progress Bar */}
      <AnimatePresence>
        {state.isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-xs"
          >
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-blue-600 h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${state.progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
              Capturing screenshot...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {state.status === "error" && state.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 max-w-xs"
          >
            <p className="text-sm text-red-700 dark:text-red-400 text-center">
              {state.error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {state.status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 max-w-xs"
          >
            <p className="text-sm text-green-700 dark:text-green-400 text-center">
              Screenshot downloaded successfully!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}