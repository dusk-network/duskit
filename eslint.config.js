import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import globals from "globals";
import turboConfig from "eslint-config-turbo/flat";
import jsEsLintConfig from "@dusk-network/eslint-config";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  ...turboConfig,
  ...jsEsLintConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      sourceType: "module",
    },
    settings: {
      "import/resolver": {
        node: {},
      },
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  globalIgnores(["apps/", "packages/"]),
]);
