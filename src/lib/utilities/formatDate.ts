/**
 * Formats a date string in the format "2023-03-01" to "01/03/2023".
 * @param isoString The ISO date string.
 * @returns The formatted date string.
 */
export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
};
