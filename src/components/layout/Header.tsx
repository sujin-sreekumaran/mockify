"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const ThemeToggle = dynamic(
  () => import("@/components/ui/ThemeToggle").then((mod) => ({ default: mod.ThemeToggle })),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-10 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800" />
    ),
  }
);

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({
  title = "DM Screenshot Generator",
  subtitle = "Create authentic-looking direct message screenshots",
  actions,
  className,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    {subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
