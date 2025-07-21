"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";
import { Header, Sidebar, Main } from "@/components/layout";
import { Button, PlatformSelector, ScreenshotGenerator } from "@/components/ui";
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
  const previewRef = useRef<HTMLDivElement>(null);

  // Handle theme safely
  let theme: "light" | "dark" = "light";
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
  } catch (error) {
    // ThemeProvider not available, use default
    
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

  const handleReset = () => {
    setChatData({
      contactName: "",
      contactImage: null,
      userImage: null,
      messages: [],
    });
  };

  const handleLoadSample = () => {
    setChatData({
      contactName: "Alex Johnson",
      contactImage: null,
      userImage: null,
      messages: [
        {
          id: "1",
          content: "Hey! How are you doing?",
          sender: "contact",
          timestamp: new Date(Date.now() - 300000),
          type: "text",
        },
        {
          id: "2", 
          content: "I'm doing great! Just finished work. How about you?",
          sender: "user",
          timestamp: new Date(Date.now() - 240000),
          type: "text",
        },
        {
          id: "3",
          content: "Same here! Want to grab dinner tonight?",
          sender: "contact", 
          timestamp: new Date(Date.now() - 180000),
          type: "text",
        },
        {
          id: "4",
          content: "Sounds perfect! What time works for you?",
          sender: "user",
          timestamp: new Date(Date.now() - 120000),
          type: "text",
        },
        {
          id: "5",
          content: "How about 7 PM at that new Italian place?",
          sender: "contact",
          timestamp: new Date(Date.now() - 60000),
          type: "text",
        },
        {
          id: "6",
          content: "Perfect! See you there 😊",
          sender: "user",
          timestamp: new Date(),
          type: "text",
        },
      ],
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
              <ScreenshotGenerator
                targetRef={previewRef}
                filename={`${selectedPlatform}-dm-screenshot`}
                onGenerating={setLoading}
                onSuccess={(blob) => {
                  console.log("Screenshot generated successfully:", {
                    size: blob.size,
                    type: blob.type,
                    platform: selectedPlatform,
                    hasMessages: chatData.messages.length > 0,
                    contactName: chatData.contactName
                  });
                }}
                onError={(error) => {
                  console.error("Screenshot generation failed:", error);
                  console.log("Debug info:", {
                    platform: selectedPlatform,
                    hasMessages: chatData.messages.length > 0,
                    contactName: chatData.contactName,
                    elementExists: !!previewRef.current
                  });
                }}
                className="w-full"
              />

              <div className="grid grid-cols-2 gap-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="secondary"
                    className="w-full h-10 text-sm"
                    onClick={handleLoadSample}
                  >
                    <div className="flex items-center space-x-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>Sample</span>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-10 text-sm border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                    onClick={handleReset}
                  >
                    <div className="flex items-center space-x-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Reset</span>
                    </div>
                  </Button>
                </motion.div>
              </div>

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
            <div ref={previewRef} className="p-4 bg-transparent" style={{ display: "inline-block", minWidth: "375px" }}>
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
          </div>
        </Main>
      </div>
    </>
  );
}
