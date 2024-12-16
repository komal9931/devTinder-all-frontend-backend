import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names.
 * @param  {...any} inputs - Class names or conditions to merge.
 * @returns {string} - The merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
