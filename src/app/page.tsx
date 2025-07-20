"use client";

import { useState, useEffect } from "react";

// Force dynamic rendering to avoid SSG issues with useTheme
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
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Chat Settings
              </h2>

              <div className="space-y-4">
                <PlatformSelector
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={setSelectedPlatform}
                />

                <ChatEditor chatData={chatData} onChatDataChange={handleChatDataChange} />

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    loading={loading}
                    onClick={handleGenerate}
                    disabled={!chatData.contactName || chatData.messages.length === 0}
                  >
                    Generate Screenshot
                  </Button>

                  <Button variant="outline" className="w-full" onClick={handleReset}>
                    Reset Form
                  </Button>
                </div>
              </div>
            </div>
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
