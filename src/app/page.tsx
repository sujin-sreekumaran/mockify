"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";
import { Header, Sidebar, Main } from "@/components/layout";
import { Button, PlatformSelector } from "@/components/ui";
import { ChatEditor } from "@/components/forms";
import {
  InstagramPreview,
  TwitterPreview,
  WhatsAppPreview,
  FacebookPreview,
  TinderPreview,
  LinkedInPreview,
} from "@/components/platform-previews";
import { PlatformId, ChatData } from "@/types";
import { getPlatformConfig } from "@/lib/platforms";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle theme safely
  let theme: "light" | "dark" = "light";
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
  } catch (error) {
    // ThemeProvider not available, use default
    console.warn("Theme context not available, using default theme");
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>("instagram");
  const [chatData, setChatData] = useState<ChatData>({
    contactName: "",
    contactImage: null,
    userImage: null,
    messages: [],
  });

  const handleChatDataChange = (newChatData: ChatData) => {
    setChatData(newChatData);
  };

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate screenshot generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const handleReset = () => {
    setChatData({
      contactName: "",
      contactImage: null,
      userImage: null,
      messages: [],
    });
  };

  return (
    <>
      <Header />

      <div className="flex h-screen pt-16 bg-gray-100 dark:bg-gray-900">
        <Sidebar>
          <div className="space-y-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Customize Chat
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Design your perfect conversation
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Platform Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PlatformSelector
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
              />
            </motion.div>

            {/* Chat Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ChatEditor chatData={chatData} onChatDataChange={handleChatDataChange} />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="primary"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  loading={loading}
                  onClick={handleGenerate}
                  disabled={!chatData.contactName || chatData.messages.length === 0}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Generate Screenshot</span>
                    </div>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-10 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  onClick={handleReset}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Reset Form</span>
                  </div>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {chatData.messages.length}
                    </div>
                    <div className="text-xs text-gray-600">Messages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                    </div>
                    <div className="text-xs text-gray-600">Platform</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Sidebar>

        <Main>
          <div className="h-full flex items-center justify-center p-8">
            {selectedPlatform === "instagram" ? (
              <InstagramPreview
                chatData={chatData}
                config={getPlatformConfig("instagram") as any}
                theme={theme}
              />
            ) : selectedPlatform === "twitter" ? (
              <TwitterPreview
                chatData={chatData}
                config={getPlatformConfig("twitter") as any}
                theme={theme}
              />
            ) : selectedPlatform === "whatsapp" ? (
              <WhatsAppPreview chatData={chatData} config={getPlatformConfig("whatsapp") as any} />
            ) : selectedPlatform === "facebook" ? (
              <FacebookPreview
                chatData={chatData}
                config={getPlatformConfig("facebook") as any}
                theme={theme}
              />
            ) : selectedPlatform === "tinder" ? (
              <TinderPreview
                chatData={chatData}
                config={getPlatformConfig("tinder") as any}
                theme={theme}
              />
            ) : selectedPlatform === "linkedin" ? (
              <LinkedInPreview
                chatData={chatData}
                config={getPlatformConfig("linkedin") as any}
                theme={theme}
              />
            ) : (
              <div className="text-center max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Preview Area
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Platform preview not available.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Please select a supported platform.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Main>
      </div>
    </>
  );
}
