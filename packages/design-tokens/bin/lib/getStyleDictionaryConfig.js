import { css, js } from "./platforms/index.js";

/**
 * Style Dictionary configuration generator
 *
 * @type {StyleDictionaryConfigGenerator}
 */
export const getStyleDictionaryConfig = (
  filename,
  source,
  include,
  options,
  platforms = {}
) => ({
  include,

  log: {
    errors: {
      brokenReferences: "throw",
    },
    verbosity: "verbose",
    warnings: "warn",
  },
  platforms: Object.fromEntries(
    Object.entries({
      css: css(`css/${filename}.css`, options.prefix, options.buildPath, {
        theme: options.theme,
        themed: options.themed,
      }),
      js: js(`js/${filename}.js`, options.prefix, options.buildPath, {
        theme: options.theme,
        themed: options.themed,
      }),
      ...platforms,
    })
  ),
  source,
});
