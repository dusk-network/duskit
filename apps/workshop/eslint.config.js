import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import globals from "globals";
import jsEsLintConfig from "@dusk-network/eslint-config";
import svelteEsLintConfig from "@dusk-network/eslint-config/svelte";

import svelteConfig from "./svelte.config.js";

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
    files: ["**/*.{js,mjs,cjs}"],
  },
  {
    extends: [svelteEsLintConfig],
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        svelteConfig,
      },
    },
  },
  globalIgnores([".histoire/", "build/"]),
]);
