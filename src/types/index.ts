// Core type definitions for the DM Screenshot Generator

// ============================================================================
// Core Data Interfaces
// ============================================================================

export interface ChatData {
  contactName: string;
  contactImage: string | null;
  userImage: string | null;
  messages: Message[];
  phoneStatus?: PhoneStatus;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "contact";
  timestamp: Date;
  type: "text" | "image" | "emoji";
  status?: MessageStatus;
}

export interface PhoneStatus {
  time: string;
  batteryPercent: number;
  carrier: string;
  signalStrength: number;
  osType: "ios" | "android";
}

// ============================================================================
// Platform Configuration
// ============================================================================

export type PlatformId = "instagram" | "twitter" | "whatsapp" | "facebook" | "tinder";

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  displayName: string;
  colors: PlatformColors;
  typography: PlatformTypography;
  layout: PlatformLayout;
  features: PlatformFeatures;
}

export interface PlatformColors {
  primary: string;
  secondary: string;
  background: string;
  userBubble: string;
  contactBubble: string;
  text: string;
  textSecondary: string;
  accent?: string;
  gradient?: {
    from: string;
    to: string;
  };
}

export interface PlatformTypography {
  fontFamily: string;
  messageSize: string;
  nameSize: string;
  timestampSize: string;
  fontWeight: {
    normal: string;
    medium: string;
    bold: string;
  };
}

export interface PlatformLayout {
  bubbleRadius: string;
  spacing: string;
  avatarSize: string;
  maxBubbleWidth: string;
  padding: {
    message: string;
    container: string;
  };
  margins: {
    message: string;
    timestamp: string;
  };
}

export interface PlatformFeatures {
  hasStatusIndicators: boolean;
  hasTypingIndicator: boolean;
  hasOnlineStatus: boolean;
  hasMessageReactions: boolean;
  timestampFormat: "12h" | "24h";
}

// ============================================================================
// Platform-Specific Types
// ============================================================================

export interface InstagramConfig extends PlatformConfig {
  id: "instagram";
  features: PlatformFeatures & {
    hasStoryRing: boolean;
    hasVerifiedBadge: boolean;
  };
}

export interface TwitterConfig extends PlatformConfig {
  id: "twitter";
  features: PlatformFeatures & {
    hasVerifiedBadge: boolean;
    hasEncryption: boolean;
  };
}

export interface WhatsAppConfig extends PlatformConfig {
  id: "whatsapp";
  features: PlatformFeatures & {
    hasDeliveryStatus: boolean;
    hasLastSeen: boolean;
  };
}

export interface FacebookConfig extends PlatformConfig {
  id: "facebook";
  features: PlatformFeatures & {
    hasActiveStatus: boolean;
    hasMessageReactions: boolean;
  };
}

export interface TinderConfig extends PlatformConfig {
  id: "tinder";
  features: PlatformFeatures & {
    hasMatchInfo: boolean;
    hasGifSupport: boolean;
  };
}

// ============================================================================
// Theme and Context Types
// ============================================================================

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  systemTheme: Theme;
}

export interface AppState {
  selectedPlatform: PlatformId;
  chatData: ChatData;
  isGeneratingScreenshot: boolean;
  error: string | null;
}

// ============================================================================
// Message and Status Types
// ============================================================================

export type MessageType = "text" | "image" | "emoji" | "gif" | "sticker";
export type MessageSender = "user" | "contact";
export type MessageStatus = "sent" | "delivered" | "read" | "failed";

export interface MessageReaction {
  emoji: string;
  sender: MessageSender;
}

export interface ExtendedMessage extends Message {
  reactions?: MessageReaction[];
  replyTo?: string; // Message ID being replied to
  edited?: boolean;
  editedAt?: Date;
}

// ============================================================================
// Component Props Utility Types
// ============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PlatformPreviewProps extends BaseComponentProps {
  platform: PlatformId;
  chatData: ChatData;
  config: PlatformConfig;
  theme: Theme;
}

export interface ChatEditorProps extends BaseComponentProps {
  chatData: ChatData;
  onChatDataChange: (data: ChatData) => void;
  disabled?: boolean;
}

export interface PlatformSelectorProps extends BaseComponentProps {
  selectedPlatform: PlatformId;
  onPlatformChange: (platform: PlatformId) => void;
  platforms: PlatformConfig[];
}

export interface ScreenshotGeneratorProps extends BaseComponentProps {
  targetRef: React.RefObject<HTMLElement>;
  filename?: string;
  onGenerating?: (isGenerating: boolean) => void;
  onSuccess?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export interface ThemeToggleProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg";
  variant?: "button" | "switch";
}

export interface MessageBubbleProps extends BaseComponentProps {
  message: Message | ExtendedMessage;
  isUser: boolean;
  config: PlatformConfig;
  theme: Theme;
  showTimestamp?: boolean;
  showAvatar?: boolean;
}

export interface FileUploadProps extends BaseComponentProps {
  accept: string;
  maxSize?: number;
  onFileSelect: (file: File | null) => void;
  preview?: string | null;
  placeholder?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type PlatformConfigMap = {
  [K in PlatformId]: PlatformConfig;
};

export type MessageWithoutId = Omit<Message, "id">;
export type ChatDataPartial = Partial<ChatData>;

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
}

// Screenshot generation types
export interface ScreenshotOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "png" | "jpeg" | "webp";
  scale?: number;
}

export interface ScreenshotResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
}
