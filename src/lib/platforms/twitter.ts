import { TwitterConfig } from "@/types";

export const twitterConfig: TwitterConfig = {
  id: "twitter",
  name: "twitter",
  displayName: "X (Twitter)",
  colors: {
    primary: "#000000",
    secondary: "#536471",
    background: "#F7F7F7",
    userBubble: "#1D9BF0",
    contactBubble: "#E5E5EA",
    text: "#000000",
    textSecondary: "#8E8E93",
    accent: "#1D9BF0",
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    messageSize: "15px",
    nameSize: "15px",
    timestampSize: "12px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "600",
    },
  },
  layout: {
    bubbleRadius: "18px",
    spacing: "4px",
    avatarSize: "40px",
    maxBubbleWidth: "250px",
    padding: {
      message: "8px 12px",
      container: "16px",
    },
    margins: {
      message: "1px 0",
      timestamp: "4px 0",
    },
  },
  features: {
    hasStatusIndicators: true,
    hasTypingIndicator: false,
    hasOnlineStatus: false,
    hasMessageReactions: true,
    timestampFormat: "12h",
    hasVerifiedBadge: true,
    hasEncryption: true,
  },
};
