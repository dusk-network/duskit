import { rimraf } from "rimraf";

import { build as buildMotion } from "./stage/motion.js";
import { build as buildTheme } from "./stage/theme.js";
import { build as buildSize } from "./stage/size.js";
import { build as buildTypography } from "./stage/typography.js";

/**
 * buildDesignTokens
 *
 * @param {ConfigGeneratorOptions} buildOptions
 */
const buildDesignTokens = async (buildOptions) => {
  await Promise.all([
    buildTheme(buildOptions),
    buildSize(buildOptions),
    buildTypography(buildOptions),
    buildMotion(buildOptions),
  ]).catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await rimraf("dist");
    throw e;
  });
};

// Implicit clean
await rimraf("dist");

// Run
await buildDesignTokens({
  buildPath: "dist/",
});
