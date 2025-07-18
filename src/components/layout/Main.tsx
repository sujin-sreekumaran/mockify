"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MainProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  maxWidth?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const paddingVariants = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const maxWidthVariants = {
  none: "",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function Main({ children, className, padding = "md", maxWidth = "full" }: MainProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "flex-1 overflow-auto bg-gray-50 dark:bg-gray-800",
        paddingVariants[padding],
        className
      )}
    >
      <div className={cn("mx-auto h-full", maxWidthVariants[maxWidth])}>{children}</div>
    </motion.main>
  );
}
