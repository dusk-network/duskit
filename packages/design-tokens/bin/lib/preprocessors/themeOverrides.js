import { transformTokens } from "./transformTokens.js";

/**
 * @typedef {import('style-dictionary/types').PlatformConfig} PlatformConfig
 * @typedef {import('style-dictionary/types').PreprocessedTokens} PreprocessedTokens
 * @typedef {import('style-dictionary/types').Preprocessor} Preprocessor
 */

/**
 * Converts a single item or array into an array, filtering out falsy values
 *
 * @param {*} item Input item
 */
export const asArray = (item) =>
  (Array.isArray(item) ? item : [item]).filter(Boolean);

/**
 * Theme overrides preprocessor
 *
 * @type {Preprocessor}
 */
export const themeOverrides = {
  name: "themeOverrides",

  /**
   * Preprocess tokens to apply theme overrides
   *
   * @param {PreprocessedTokens} dictionary
   * @param {PlatformConfig} config
   * @returns {PreprocessedTokens}
   */
  preprocessor: (dictionary, config) => {
    const extensionProp =
      config.options?.themeOverrides?.extensionProp || "org.duskit.overrides";
    const valueProp = config.options?.themeOverrides?.valueProp || "$value";
    const [currentTheme, fallbackTheme] = asArray(
      config.options?.themeOverrides?.theme
    );

    const tokens = transformTokens(dictionary, (token) => {
      if (
        !currentTheme ||
        !token.$extensions?.[extensionProp] ||
        (!token.$extensions?.[extensionProp][currentTheme] &&
          !token.$extensions?.[extensionProp][fallbackTheme])
      ) {
        return token;
      }

      const override =
        token.$extensions?.[extensionProp][currentTheme] ||
        token.$extensions?.[extensionProp][fallbackTheme];

      return {
        ...token,
        ...(typeof override === "object"
          ? override
          : { [valueProp]: override }),
      };
    });

    return tokens;
  },
};
