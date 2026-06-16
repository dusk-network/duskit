import path from "node:path";
import { fileURLToPath } from "node:url";
import remarkGfm from "remark-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");

/** @type {import("@storybook/svelte-vite").StorybookConfig} */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|svelte)"],
  // Actions/controls are part of Storybook core (v9+). Only keep real addons here.
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-themes",
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  async viteFinal(viteConfig) {
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
      base: "./",
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

export default config;
