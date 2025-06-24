import { getStyleDictionaryConfig } from "../lib/getStyleDictionaryConfig.js";
import DuskitStyleDictionary from "../lib/duskitStyleDictionary.js";

/**
 * build
 *
 * @param {ConfigGeneratorOptions} buildOptions
 */
export async function build(buildOptions) {
  try {
    const SdTypography = await DuskitStyleDictionary.extend(
      getStyleDictionaryConfig(
        `base/typography`,
        [`src/tokens/base/typography.json`],
        [],
        buildOptions
      )
    );
    await SdTypography.buildAllPlatforms();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error building typography:", e);
  }
}
