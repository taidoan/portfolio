/**
 * Capitalises the first letter of a string
 * @param {string} str - The string to capitalise
 * @returns {string} The capitalised string
 * @example
 * ```ts
 * capitaliseFirstLetter('hello world'); // Hello world
 */
export const capitaliseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
