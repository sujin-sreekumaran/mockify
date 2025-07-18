import { WhatsAppConfig } from "@/types";

export const whatsappConfig: WhatsAppConfig = {
  id: "whatsapp",
  name: "whatsapp",
  displayName: "WhatsApp",
  colors: {
    primary: "#25D366",
    secondary: "#128C7E",
    background: "#E5DDD5",
    userBubble: "#DCF8C6",
    contactBubble: "#FFFFFF",
    text: "#303030",
    textSecondary: "#667781",
    accent: "#25D366",
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
      bold: "500",
    },
  },
  layout: {
    bubbleRadius: "7.5px",
    spacing: "2px",
    avatarSize: "40px",
    maxBubbleWidth: "65%",
    padding: {
      message: "6px 7px 8px 9px",
      container: "12px",
    },
    margins: {
      message: "1px 0",
      timestamp: "4px 0",
    },
  },
  features: {
    hasStatusIndicators: true,
    hasTypingIndicator: true,
    hasOnlineStatus: true,
    hasMessageReactions: false,
    timestampFormat: "24h",
    hasDeliveryStatus: true,
    hasLastSeen: true,
  },
};
