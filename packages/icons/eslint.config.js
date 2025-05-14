import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import globals from "globals";
import jsEsLintConfig from "@dusk-network/eslint-config";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
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
  globalIgnores(["coverage/"]),
]);
