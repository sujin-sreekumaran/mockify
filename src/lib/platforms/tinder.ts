import { TinderConfig } from "@/types";

export const tinderConfig: TinderConfig = {
  id: "tinder",
  name: "tinder",
  displayName: "Tinder",
  colors: {
    primary: "#FD5068",
    secondary: "#FF4458",
    background: "#FFFFFF",
    userBubble: "#FD5068",
    contactBubble: "#F5F5F5",
    text: "#424242",
    textSecondary: "#999999",
    accent: "#FF4458",
    gradient: {
      from: "#FD5068",
      to: "#FF4458",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    messageSize: "16px",
    nameSize: "18px",
    timestampSize: "12px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "600",
    },
  },
  layout: {
    bubbleRadius: "20px",
    spacing: "8px",
    avatarSize: "40px",
    maxBubbleWidth: "280px",
    padding: {
      message: "12px 16px",
      container: "20px",
    },
    margins: {
      message: "4px 0",
      timestamp: "12px 0",
    },
  },
  features: {
    hasStatusIndicators: false,
    hasTypingIndicator: true,
    hasOnlineStatus: false,
    hasMessageReactions: false,
    timestampFormat: "12h",
    hasMatchInfo: true,
    hasGifSupport: true,
  },
};
