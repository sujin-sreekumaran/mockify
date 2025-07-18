import { FacebookConfig } from "@/types";

export const facebookConfig: FacebookConfig = {
  id: "facebook",
  name: "facebook",
  displayName: "Facebook Messenger",
  colors: {
    primary: "#0084FF",
    secondary: "#4267B2",
    background: "#FFFFFF",
    userBubble: "#0084FF",
    contactBubble: "#F1F1F1",
    text: "#1C1E21",
    textSecondary: "#65676B",
    accent: "#0084FF",
    gradient: {
      from: "#0084FF",
      to: "#44BDF6",
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
    messageSize: "15px",
    nameSize: "13px",
    timestampSize: "12px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "600",
    },
  },
  layout: {
    bubbleRadius: "18px",
    spacing: "2px",
    avatarSize: "28px",
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
    hasActiveStatus: true,
  },
};
