const path = require("node:path");

const repoRoot = path.resolve(__dirname, "../../..");

/** @type {import("@storybook/svelte-vite").StorybookConfig} */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|svelte)"],
  addons: ["@storybook/addon-essentials"],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  async viteFinal(viteConfig, { configType }) {
    const [{ mergeConfig }, { svelte }] = await Promise.all([
      import("vite"),
      import("@sveltejs/vite-plugin-svelte"),
    ]);

    // Storybook's Svelte renderer ships `.svelte` sources. Ensure Vite can compile them.
    const existingPlugins = viteConfig.plugins ?? [];
    const hasSveltePlugin = existingPlugins.some(
      (p) => p?.name === "vite-plugin-svelte"
    );
    const plugins = hasSveltePlugin
      ? existingPlugins
      : [svelte(), ...existingPlugins];

    const merged = mergeConfig(viteConfig, {
      // Make the static build deployable under GitHub Pages' subpath.
      base: configType === "PRODUCTION" ? "./" : "/",
      resolve: {
        dedupe: ["svelte"],
      },
      optimizeDeps: {
        // Ensure Vite doesn't try to prebundle Svelte source from workspace packages.
        exclude: ["@duskit/components"],
      },
      server: {
        fs: {
          // Storybook sets Vite root to the config dir; allow loading workspace packages.
          allow: [repoRoot],
        },
      },
    });
    merged.plugins = plugins;
    return merged;
  },
};

module.exports = config;
