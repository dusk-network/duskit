/**
 * getFallbackTheme
 *
 * @param {string} theme
 * @returns {'light' | 'dark' | undefined} theme
 */
export const getFallbackTheme = (theme) => {
  return theme
    ? theme.toLocaleLowerCase().trim().startsWith("light")
      ? "light"
      : "dark"
    : undefined;
};
