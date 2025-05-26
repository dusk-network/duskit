/** @type {PlatformInitializer} */
export const js = (outputFile, prefix, buildPath, options) => ({
  buildPath,
  files: [
    {
      destination: `${outputFile}`,
      format: "javascript/esm",
      options: {
        showFileHeader: false,
        ...options?.options,
      },
    },
  ],
  options: {
    basePxFontSize: 16,
    themeOverrides: {
      theme: options?.theme,
    },
  },
  prefix,
  preprocessors: ["themeOverrides"],
  transformGroup: "js",
});
