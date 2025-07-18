// Type validation examples to ensure our interfaces work correctly
import type {
  ChatData,
  Message,
  PlatformConfig,
  PlatformId,
  ThemeContextType,
  AppState,
  MessageWithoutId,
  PlatformPreviewProps,
  ScreenshotOptions,
  InstagramConfig,
  TwitterConfig,
  WhatsAppConfig,
  FacebookConfig,
  TinderConfig,
} from "./index";

// Example usage of ChatData interface
const exampleChatData: ChatData = {
  contactName: "John Doe",
  contactImage: null,
  userImage: null,
  messages: [],
  phoneStatus: {
    time: "10:30",
    batteryPercent: 85,
    carrier: "Verizon",
    signalStrength: 4,
    osType: "ios",
  },
};

// Example usage of Message interface
const exampleMessage: Message = {
  id: "1",
  content: "Hello world!",
  sender: "user",
  timestamp: new Date(),
  type: "text",
  status: "sent",
};

// Example usage of PlatformConfig interface
const examplePlatformConfig: PlatformConfig = {
  id: "instagram",
  name: "instagram",
  displayName: "Instagram",
  colors: {
    primary: "#E4405F",
    secondary: "#833AB4",
    background: "#FFFFFF",
    userBubble: "#E4405F",
    contactBubble: "#F0F0F0",
    text: "#000000",
    textSecondary: "#666666",
    gradient: {
      from: "#E4405F",
      to: "#833AB4",
    },
  },
  typography: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    messageSize: "14px",
    nameSize: "16px",
    timestampSize: "12px",
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "600",
    },
  },
  layout: {
    bubbleRadius: "18px",
    spacing: "8px",
    avatarSize: "32px",
    maxBubbleWidth: "70%",
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
    hasTypingIndicator: true,
    hasOnlineStatus: true,
    hasMessageReactions: true,
    timestampFormat: "12h",
  },
};

// Example usage of platform-specific configs
const instagramConfig: InstagramConfig = {
  ...examplePlatformConfig,
  id: "instagram",
  features: {
    ...examplePlatformConfig.features,
    hasStoryRing: true,
    hasVerifiedBadge: true,
  },
};

// Example usage of ThemeContextType
const exampleThemeContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
  systemTheme: "light",
};

// Example usage of AppState
const exampleAppState: AppState = {
  selectedPlatform: "instagram",
  chatData: exampleChatData,
  isGeneratingScreenshot: false,
  error: null,
};

// Example usage of utility types
const messageWithoutId: MessageWithoutId = {
  content: "Test message",
  sender: "contact",
  timestamp: new Date(),
  type: "text",
};

// Example usage of ScreenshotOptions
const screenshotOptions: ScreenshotOptions = {
  width: 400,
  height: 800,
  quality: 0.9,
  format: "png",
  scale: 2,
};

// Validate that all platform IDs are correctly typed
const allPlatforms: PlatformId[] = ["instagram", "twitter", "whatsapp", "facebook", "tinder"];

// Export examples for potential use in other files
export {
  exampleChatData,
  exampleMessage,
  examplePlatformConfig,
  instagramConfig,
  exampleThemeContext,
  exampleAppState,
  messageWithoutId,
  screenshotOptions,
  allPlatforms,
};
