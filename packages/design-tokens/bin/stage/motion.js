import { getStyleDictionaryConfig } from "../lib/getStyleDictionaryConfig.js";
import DuskitStyleDictionary from "../lib/duskitStyleDictionary.js";
import { css, js } from "../lib/platforms/index.js";

/**
 * build
 *
 * @param {ConfigGeneratorOptions} buildOptions
 */
export async function build(buildOptions) {
  try {
    const SdMotion = await DuskitStyleDictionary.extend(
      getStyleDictionaryConfig(
        `base/motion`,
        [`src/tokens/base/motion/*.json`],
        [],
        buildOptions
      )
    );
    await SdMotion.buildAllPlatforms();

    const extendedSD = await DuskitStyleDictionary.extend(
      getStyleDictionaryConfig(
        `functional/motion`,
        [
          `src/tokens/functional/motion/loading.json`,
          `src/tokens/functional/motion/pattern.json`,
        ],
        [`src/tokens/base/motion/*.json`],
        buildOptions,
        {
          css: css(
            `css/functional/motion.css`,
            buildOptions.prefix,
            buildOptions.buildPath,
            {
              options: {
                outputReferences: true,
              },
            }
          ),
          js: js(
            `js/functional/motion.js`,
            buildOptions.prefix,
            buildOptions.buildPath,
            {
              options: {
                outputReferences: true,
              },
            }
          ),
        }
      )
    );
    await extendedSD.buildAllPlatforms();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error building motion:", e);
  }
}
