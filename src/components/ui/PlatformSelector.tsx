"use client";

import { motion } from "framer-motion";
import { PlatformId } from "@/types";
import { getAllPlatforms } from "@/lib/platforms";

interface PlatformSelectorProps {
  selectedPlatform: PlatformId;
  onPlatformChange: (platform: PlatformId) => void;
  className?: string;
}

// Platform icons as SVG components
const PlatformIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tinder: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M7.11 1.54C3.17 3.24 0 7.09 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12c0-4.91-3.17-8.76-7.11-10.46-.83 1.32-1.89 2.5-3.11 3.5 2.33 1.45 3.89 4.01 3.89 6.96 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.95 1.56-5.51 3.89-6.96-1.22-1-2.28-2.18-3.11-3.5z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export function PlatformSelector({
  selectedPlatform,
  onPlatformChange,
  className = "",
}: PlatformSelectorProps) {
  const platforms = getAllPlatforms();

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Platform</h3>

      <div className="grid grid-cols-1 gap-2">
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={`
              relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200
              ${
                selectedPlatform === platform.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Platform Icon */}
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200
                ${
                  selectedPlatform === platform.id
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400"
                }
              `}
              style={{
                backgroundColor:
                  selectedPlatform === platform.id ? platform.colors.primary : "transparent",
                border:
                  selectedPlatform === platform.id
                    ? "none"
                    : `2px solid ${platform.colors.primary}20`,
              }}
            >
              {PlatformIcons[platform.id]}
            </div>

            {/* Platform Info */}
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {platform.displayName}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {platform.id === "instagram" && "Direct Messages"}
                {platform.id === "twitter" && "Direct Messages"}
                {platform.id === "whatsapp" && "Chat Messages"}
                {platform.id === "facebook" && "Messenger"}
                {platform.id === "tinder" && "Match Messages"}
                {platform.id === "linkedin" && "Professional Messages"}
              </div>
            </div>

            {/* Selection Indicator */}
            <motion.div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  selectedPlatform === platform.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }
              `}
              initial={false}
              animate={{
                scale: selectedPlatform === platform.id ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            >
              {selectedPlatform === platform.id && (
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                />
              )}
            </motion.div>

            {/* Gradient Overlay for Selected State */}
            {selectedPlatform === platform.id && platform.colors.gradient && (
              <motion.div
                className="absolute inset-0 rounded-lg opacity-10 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${platform.colors.gradient.from}, ${platform.colors.gradient.to})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
