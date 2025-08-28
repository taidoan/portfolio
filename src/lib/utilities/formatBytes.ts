/**
 * Formats bytes to a human-readable format.
 *
 * @param {number} bytes - The number of bytes to format.
 * @returns {string} The formatted string.
 * @example
 * formatBytes(1024) // '1 KB'
 * formatBytes(1024 * 1024) // '1 MB'
 * formatBytes(1024 * 1024 * 1024) // '1 GB'
 */
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1000;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
