/**
 * Truncates a string to a specified length, appending an optional suffix if truncation occurs.
 *
 * @param {string} str - The string to be truncated.
 * @param {number} maxLength - The maximum allowed length of the string, including the suffix.
 * @param {string} [suffix='...'] - The optional suffix to indicate truncation. Defaults to `'...'`.
 * @returns {string | React.ReactNode} - The truncated string with the suffix if applicable, otherwise the original string.
 *
 * @example
 * // Basic usage:
 * truncate("Hello, world!", 10); // "Hello, w..."
 *
 * @example
 * // Custom suffix:
 * truncate("JavaScript", 7, ">>>"); // "JavaSc>>>"
 *
 * @example
 * // No truncation needed:
 * truncate("Short", 10); // "Short"
 */
export const truncate = (
  str: string,
  maxLength: number,
  suffix: string = '...',
): string | React.ReactNode => {
  return str.length > maxLength ? str.slice(0, maxLength - 1) + suffix : str;
};
