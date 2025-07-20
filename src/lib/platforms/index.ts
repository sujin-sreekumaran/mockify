import { PlatformConfig, PlatformId, PlatformConfigMap } from "@/types";
import { instagramConfig } from "./instagram";
import { twitterConfig } from "./twitter";
import { whatsappConfig } from "./whatsapp";
import { facebookConfig } from "./facebook";
import { tinderConfig } from "./tinder";
import { linkedinConfig } from "./linkedin";

// ============================================================================
// Platform Configuration Map
// ============================================================================

export const platformConfigs: PlatformConfigMap = {
  instagram: instagramConfig,
  twitter: twitterConfig,
  whatsapp: whatsappConfig,
  facebook: facebookConfig,
  tinder: tinderConfig,
  linkedin: linkedinConfig,
};

// ============================================================================
// Platform Configuration Utilities
// ============================================================================

/**
 * Get all available platform configurations
 */
export function getAllPlatforms(): PlatformConfig[] {
  return Object.values(platformConfigs);
}

/**
 * Get platform configuration by ID with validation and fallback
 */
export function getPlatformConfig(platformId: PlatformId): PlatformConfig {
  const config = platformConfigs[platformId];

  if (!config) {
    console.warn(`Platform configuration not found for: ${platformId}. Falling back to Instagram.`);
    return platformConfigs.instagram;
  }

  // Validate configuration completeness
  if (!isValidPlatformConfig(config)) {
    console.warn(`Invalid platform configuration for: ${platformId}. Falling back to Instagram.`);
    return platformConfigs.instagram;
  }

  return config;
}

/**
 * Check if a platform ID is valid
 */
export function isValidPlatformId(platformId: string): platformId is PlatformId {
  return platformId in platformConfigs;
}

/**
 * Get the default platform configuration
 */
export function getDefaultPlatform(): PlatformConfig {
  return platformConfigs.instagram;
}

/**
 * Get platform configuration with theme-aware colors
 */
export function getPlatformConfigWithTheme(
  platformId: PlatformId,
  theme: "light" | "dark"
): PlatformConfig {
  const config = getPlatformConfig(platformId);

  if (theme === "dark") {
    return {
      ...config,
      colors: {
        ...config.colors,
        background: getDarkModeBackground(config.colors.background),
        text: getDarkModeText(config.colors.text),
        textSecondary: getDarkModeTextSecondary(config.colors.textSecondary),
        contactBubble: getDarkModeContactBubble(config.colors.contactBubble),
      },
    };
  }

  return config;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate that a platform configuration has all required fields
 */
function isValidPlatformConfig(config: any): config is PlatformConfig {
  if (!config || typeof config !== "object") {
    return false;
  }

  // Check required top-level fields
  const requiredFields = [
    "id",
    "name",
    "displayName",
    "colors",
    "typography",
    "layout",
    "features",
  ];
  for (const field of requiredFields) {
    if (!(field in config)) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // Validate colors object
  if (!isValidColorsConfig(config.colors)) {
    return false;
  }

  // Validate typography object
  if (!isValidTypographyConfig(config.typography)) {
    return false;
  }

  // Validate layout object
  if (!isValidLayoutConfig(config.layout)) {
    return false;
  }

  // Validate features object
  if (!isValidFeaturesConfig(config.features)) {
    return false;
  }

  return true;
}

/**
 * Validate colors configuration
 */
function isValidColorsConfig(colors: any): boolean {
  const requiredColorFields = [
    "primary",
    "secondary",
    "background",
    "userBubble",
    "contactBubble",
    "text",
    "textSecondary",
  ];

  for (const field of requiredColorFields) {
    if (!(field in colors) || typeof colors[field] !== "string") {
      console.error(`Invalid or missing color field: ${field}`);
      return false;
    }
  }

  return true;
}

/**
 * Validate typography configuration
 */
function isValidTypographyConfig(typography: any): boolean {
  const requiredTypographyFields = [
    "fontFamily",
    "messageSize",
    "nameSize",
    "timestampSize",
    "fontWeight",
  ];

  for (const field of requiredTypographyFields) {
    if (!(field in typography)) {
      console.error(`Missing typography field: ${field}`);
      return false;
    }
  }

  // Validate fontWeight object
  const requiredFontWeights = ["normal", "medium", "bold"];
  for (const weight of requiredFontWeights) {
    if (!(weight in typography.fontWeight)) {
      console.error(`Missing font weight: ${weight}`);
      return false;
    }
  }

  return true;
}

/**
 * Validate layout configuration
 */
function isValidLayoutConfig(layout: any): boolean {
  const requiredLayoutFields = [
    "bubbleRadius",
    "spacing",
    "avatarSize",
    "maxBubbleWidth",
    "padding",
    "margins",
  ];

  for (const field of requiredLayoutFields) {
    if (!(field in layout)) {
      console.error(`Missing layout field: ${field}`);
      return false;
    }
  }

  // Validate padding object
  if (!("message" in layout.padding) || !("container" in layout.padding)) {
    console.error("Invalid padding configuration");
    return false;
  }

  // Validate margins object
  if (!("message" in layout.margins) || !("timestamp" in layout.margins)) {
    console.error("Invalid margins configuration");
    return false;
  }

  return true;
}

/**
 * Validate features configuration
 */
function isValidFeaturesConfig(features: any): boolean {
  const requiredFeatureFields = [
    "hasStatusIndicators",
    "hasTypingIndicator",
    "hasOnlineStatus",
    "hasMessageReactions",
    "timestampFormat",
  ];

  for (const field of requiredFeatureFields) {
    if (!(field in features)) {
      console.error(`Missing feature field: ${field}`);
      return false;
    }
  }

  // Validate timestamp format
  if (!["12h", "24h"].includes(features.timestampFormat)) {
    console.error("Invalid timestamp format");
    return false;
  }

  return true;
}

// ============================================================================
// Dark Mode Color Utilities
// ============================================================================

/**
 * Convert light mode background to dark mode
 */
function getDarkModeBackground(lightColor: string): string {
  const darkBackgrounds: Record<string, string> = {
    "#FFFFFF": "#000000",
    "#E5DDD5": "#0B141A", // WhatsApp dark background
  };

  return darkBackgrounds[lightColor] || "#1A1A1A";
}

/**
 * Convert light mode text to dark mode
 */
function getDarkModeText(lightColor: string): string {
  const darkTexts: Record<string, string> = {
    "#262626": "#FFFFFF", // Instagram
    "#14171A": "#FFFFFF", // Twitter
    "#303030": "#E1E9F0", // WhatsApp
    "#1C1E21": "#E4E6EA", // Facebook
    "#424242": "#FFFFFF", // Tinder
    "#000000": "#FFFFFF", // LinkedIn
  };

  return darkTexts[lightColor] || "#FFFFFF";
}

/**
 * Convert light mode secondary text to dark mode
 */
function getDarkModeTextSecondary(lightColor: string): string {
  const darkSecondaryTexts: Record<string, string> = {
    "#8E8E8E": "#A8A8A8", // Instagram
    "#657786": "#8B98A5", // Twitter
    "#667781": "#8696A0", // WhatsApp
    "#65676B": "#B0B3B8", // Facebook
    "#999999": "#CCCCCC", // Tinder
    "#666666": "#AAAAAA", // LinkedIn
  };

  return darkSecondaryTexts[lightColor] || "#AAAAAA";
}

/**
 * Convert light mode contact bubble to dark mode
 */
function getDarkModeContactBubble(lightColor: string): string {
  const darkContactBubbles: Record<string, string> = {
    "#EFEFEF": "#262626", // Instagram
    "#F7F9FA": "#192734", // Twitter
    "#FFFFFF": "#262D31", // WhatsApp
    "#F1F1F1": "#3A3B3C", // Facebook
    "#F5F5F5": "#2A2A2A", // Tinder
    "#F3F2EF": "#2A2A2A", // LinkedIn
  };

  return darkContactBubbles[lightColor] || "#333333";
}

// ============================================================================
// Platform-Specific Utilities
// ============================================================================

/**
 * Get platform-specific CSS variables
 */
export function getPlatformCSSVariables(config: PlatformConfig): Record<string, string> {
  return {
    [`--${config.id}-primary`]: config.colors.primary,
    [`--${config.id}-secondary`]: config.colors.secondary,
    [`--${config.id}-background`]: config.colors.background,
    [`--${config.id}-user-bubble`]: config.colors.userBubble,
    [`--${config.id}-contact-bubble`]: config.colors.contactBubble,
    [`--${config.id}-text`]: config.colors.text,
    [`--${config.id}-text-secondary`]: config.colors.textSecondary,
    [`--${config.id}-font-family`]: config.typography.fontFamily,
    [`--${config.id}-message-size`]: config.typography.messageSize,
    [`--${config.id}-bubble-radius`]: config.layout.bubbleRadius,
    [`--${config.id}-spacing`]: config.layout.spacing,
    [`--${config.id}-avatar-size`]: config.layout.avatarSize,
  };
}

/**
 * Get platform display information for UI
 */
export function getPlatformDisplayInfo(platformId: PlatformId) {
  const config = getPlatformConfig(platformId);
  return {
    id: config.id,
    name: config.displayName,
    primaryColor: config.colors.primary,
    hasGradient: !!config.colors.gradient,
  };
}

// ============================================================================
// Exports
// ============================================================================

export {
  instagramConfig,
  twitterConfig,
  whatsappConfig,
  facebookConfig,
  tinderConfig,
  linkedinConfig,
};

export type { PlatformConfig, PlatformId, PlatformConfigMap };
