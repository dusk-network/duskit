import glob from "fast-glob";

import { getStyleDictionaryConfig } from "../lib/getStyleDictionaryConfig.js";
import DuskitStyleDictionary from "../lib/duskitStyleDictionary.js";

/**
 * build
 *
 * @param {ConfigGeneratorOptions} buildOptions
 */
export async function build(buildOptions) {
  try {
    const sizeFiles = glob.sync("src/tokens/functional/size/*");
    for (const file of sizeFiles) {
      const extendedSD = await DuskitStyleDictionary.extend(
        getStyleDictionaryConfig(
          `functional/size/${file.replace("src/tokens/functional/size/", "").replace(".json", "")}`,
          [file],
          ["src/tokens/base/size.json", ...sizeFiles],
          buildOptions
        )
      );
      await extendedSD.buildAllPlatforms();
    }

    const SdBaseSize = await DuskitStyleDictionary.extend(
      getStyleDictionaryConfig(`base/size`, ["src/tokens/base/size.json"], [], {
        buildPath: buildOptions.buildPath,
        prefix: undefined,
      })
    );
    await SdBaseSize.buildAllPlatforms();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error building size:", e);
  }
}
