/**
 *Uppercase the first letter of a string
 * @param {string} value The string to uppercase
 * @returns {string} The uppercased string
 */
export const upperFirst = (value: string) => {
  if (typeof value === 'string') {
    return ''.concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
  }
  return '';
};
