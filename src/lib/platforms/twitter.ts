import { TwitterConfig } from "@/types";

export const twitterConfig: TwitterConfig = {
  id: "twitter",
  name: "twitter",
  displayName: "Twitter",
  colors: {
    primary: "#1DA1F2",
    secondary: "#14171A",
    background: "#FFFFFF",
    userBubble: "#1DA1F2",
    contactBubble: "#F7F9FA",
    text: "#14171A",
    textSecondary: "#657786",
    accent: "#1DA1F2",
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    messageSize: "15px",
    nameSize: "15px",
    timestampSize: "13px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
  },
  layout: {
    bubbleRadius: "16px",
    spacing: "12px",
    avatarSize: "32px",
    maxBubbleWidth: "320px",
    padding: {
      message: "12px 16px",
      container: "16px",
    },
    margins: {
      message: "4px 0",
      timestamp: "8px 0",
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
