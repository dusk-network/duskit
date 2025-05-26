/** @type {PlatformInitializer} */
export const css = (outputFile, prefix, buildPath, options) => ({
  buildPath,
  files: [
    {
      destination: `${outputFile}`,
      format: "css/variables",
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
  transformGroup: "css",
});
