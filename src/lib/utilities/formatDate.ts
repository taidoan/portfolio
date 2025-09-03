/**
 * Formats a date string in the format "2023-03-01" to "01/03/2023".
 * @param isoString The ISO date string.
 * @returns The formatted date string.
 */
export const formatDate = (isoString: string): string =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
    new Date(isoString),
  );
