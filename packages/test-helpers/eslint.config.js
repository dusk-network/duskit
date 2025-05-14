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
  },
  {
    extends: [vitestEsLintConfig],
    files: ["*.js", "**/*.spec.js"],
  },
  globalIgnores(["coverage/"]),
]);
