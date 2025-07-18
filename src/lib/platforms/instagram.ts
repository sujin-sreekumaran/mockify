import { InstagramConfig } from "@/types";

export const instagramConfig: InstagramConfig = {
  id: "instagram",
  name: "instagram",
  displayName: "Instagram",
  colors: {
    primary: "#E4405F",
    secondary: "#833AB4",
    background: "#FFFFFF",
    userBubble: "#E4405F",
    contactBubble: "#EFEFEF",
    text: "#262626",
    textSecondary: "#8E8E8E",
    accent: "#F77737",
    gradient: {
      from: "#833AB4",
      to: "#E4405F",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    messageSize: "14px",
    nameSize: "14px",
    timestampSize: "11px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "600",
    },
  },
  layout: {
    bubbleRadius: "18px",
    spacing: "8px",
    avatarSize: "24px",
    maxBubbleWidth: "236px",
    padding: {
      message: "8px 12px",
      container: "16px",
    },
    margins: {
      message: "2px 0",
      timestamp: "8px 0",
    },
  },
  features: {
    hasStatusIndicators: true,
    hasTypingIndicator: true,
    hasOnlineStatus: true,
    hasMessageReactions: true,
    timestampFormat: "12h",
    hasStoryRing: true,
    hasVerifiedBadge: true,
  },
};
