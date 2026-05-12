import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import globals from "globals";
import jsEsLintConfig from "@dusk-network/eslint-config";
import svelteEsLintConfig from "@dusk-network/eslint-config/svelte";
import vitestEsLintConfig from "@dusk-network/eslint-config/vitest";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,svelte}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "module",
    },
    settings: {
      "import/resolver": {
        node: {},
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    extends: [jsEsLintConfig],
    files: ["src/**/*.{js,mjs,cjs}"],
  },
  {
    extends: [svelteEsLintConfig],
    files: ["**/*.svelte"],

    /**
     * Until we migrate to proper Svelte 5 components
     * we shouldn't be bothered by things we cannot use.
     */
    rules: {
      "svelte/prefer-svelte-reactivity": 0,
    },
  },
  {
    extends: [vitestEsLintConfig],
    files: ["*.js", "**/*.spec.js"],
  },

  /**
   * Because of how svelte export types, currently
   * `eslint-plugin-import`'s sees duplicates imports
   * (`import/no-duplicates` rule)
   */
  {
    files: [
      "src/__tests__/ToastContainer.browser.spec.js",
      "src/__tests__/ToastContainer.ssr.spec.js",
      "src/notification-feed/NotificationFeed.svelte",
      "src/progress-bar/ProgressBar.svelte",
      "src/toast-container/ToastContainer.svelte",
    ],
    rules: {
      "import/no-duplicates": "off",
    },
  },
  globalIgnores(["coverage/"]),
]);
