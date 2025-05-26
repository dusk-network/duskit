import { getStyleDictionaryConfig } from "../lib/getStyleDictionaryConfig.js";
import DuskitStyleDictionary from "../lib/duskitStyleDictionary.js";
import { getFallbackTheme } from "../lib/getFallbackTheme.js";
import { themes } from "../themes.config.js";

/**
 * build
 *
 * @param {ConfigGeneratorOptions} buildOptions
 */
export async function build(buildOptions) {
  try {
    for (const { filename, source, include, theme } of themes) {
      const config = getStyleDictionaryConfig(
        `functional/themes/${filename}`,
        source,
        include,
        {
          ...buildOptions,
          theme: [theme, getFallbackTheme(theme)],
          themed: true,
        }
      );
      const extendedSD = await DuskitStyleDictionary.extend(config);
      await extendedSD.buildAllPlatforms();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error building theme:", e);
  }
}
