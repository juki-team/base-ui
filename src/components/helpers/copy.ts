export const copy = async (text: string) => {
  if (typeof navigator !== 'undefined') {
    await navigator.clipboard.writeText(text);
  }
};
