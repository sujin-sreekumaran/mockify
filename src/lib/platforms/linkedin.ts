import { LinkedInConfig } from "@/types";

export const linkedinConfig: LinkedInConfig = {
  id: "linkedin",
  name: "linkedin",
  displayName: "LinkedIn",
  colors: {
    primary: "#0A66C2",
    secondary: "#004182",
    background: "#FFFFFF",
    userBubble: "#0A66C2",
    contactBubble: "#F3F2EF",
    text: "#000000",
    textSecondary: "#666666",
    accent: "#057642",
    gradient: {
      from: "#0A66C2",
      to: "#004182",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    messageSize: "14px",
    nameSize: "16px",
    timestampSize: "11px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "600",
    },
  },
  layout: {
    bubbleRadius: "16px",
    spacing: "8px",
    avatarSize: "40px",
    maxBubbleWidth: "320px",
    padding: {
      message: "10px 14px",
      container: "16px",
    },
    margins: {
      message: "2px 0",
      timestamp: "8px 0",
    },
  },
  features: {
    hasStatusIndicators: false,
    hasTypingIndicator: true,
    hasOnlineStatus: true,
    hasMessageReactions: false,
    timestampFormat: "12h",
    hasProfessionalInfo: true,
    hasConnectionStatus: true,
  },
};
