// Screenshot generation utilities using html2canvas

import html2canvas from "html2canvas";
import type { ScreenshotOptions, ScreenshotResult } from "@/types";

/**
 * Default screenshot options for high-quality image generation
 */
const DEFAULT_OPTIONS: Required<ScreenshotOptions> = {
  width: 448, // max-w-md equivalent (28rem = 448px)
  height: 700, // Adjusted height for mobile preview
  quality: 1.0,
  format: "png" as const,
  scale: 2, // For retina displays
};

/**
 * Generates a screenshot of the specified HTML element
 * @param element - The HTML element to capture
 * @param options - Screenshot generation options
 * @returns Promise resolving to screenshot result
 */
export async function generateScreenshot(
  element: HTMLElement,
  options: ScreenshotOptions = {}
): Promise<ScreenshotResult> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Configure html2canvas options for high quality
    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff", // White background instead of transparent
      scale: config.scale,
      useCORS: true,
      allowTaint: false,
      // Remove fixed dimensions to capture actual element size
      scrollX: 0,
      scrollY: 0,
      // Optimize for better quality
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
      // Additional options for better rendering
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        // Ignore elements that might cause issues
        return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
      },
    });

    // Convert canvas to blob with specified format and quality
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Failed to generate screenshot blob"));
          }
        },
        `image/${config.format}`,
        config.quality
      );
    });

    // Generate data URL for preview
    const dataUrl = canvas.toDataURL(`image/${config.format}`, config.quality);

    return {
      blob,
      dataUrl,
      width: canvas.width,
      height: canvas.height,
    };
  } catch (error) {
    throw new Error(
      `Screenshot generation failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Downloads a blob as a file
 * @param blob - The blob to download
 * @param filename - The filename for the download
 */
export function downloadBlob(blob: Blob, filename: string): void {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(
      `Download failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates a filename for the screenshot based on platform and timestamp
 * @param platform - The platform name
 * @param format - The image format
 * @returns Generated filename
 */
export function generateScreenshotFilename(
  platform: string,
  format: ScreenshotOptions["format"] = "png"
): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, "-");
  return `${platform}-dm-screenshot-${timestamp}.${format}`;
}

/**
 * Validates if the element is suitable for screenshot generation
 * @param element - The HTML element to validate
 * @returns Validation result with error message if invalid
 */
export function validateScreenshotElement(element: HTMLElement | null): {
  isValid: boolean;
  error?: string;
} {
  if (!element) {
    return { isValid: false, error: "Element not found" };
  }

  if (!element.offsetWidth || !element.offsetHeight) {
    return { isValid: false, error: "Element has no visible dimensions" };
  }

  if (!document.body.contains(element)) {
    return { isValid: false, error: "Element is not in the DOM" };
  }

  // Check if element is actually visible
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
    return { isValid: false, error: "Element is not visible" };
  }

  return { isValid: true };
}

/**
 * Prepares the element for screenshot by temporarily adjusting styles
 * @param element - The element to prepare
 * @returns Cleanup function to restore original styles
 */
export function prepareElementForScreenshot(element: HTMLElement): () => void {
  const originalStyles = {
    transform: element.style.transform,
    position: element.style.position,
    zIndex: element.style.zIndex,
  };

  // Temporarily adjust styles for better screenshot quality
  element.style.transform = "translateZ(0)"; // Force hardware acceleration
  element.style.position = "relative";
  element.style.zIndex = "1";

  // Return cleanup function
  return () => {
    element.style.transform = originalStyles.transform;
    element.style.position = originalStyles.position;
    element.style.zIndex = originalStyles.zIndex;
  };
}