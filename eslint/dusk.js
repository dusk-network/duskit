/**
 * The JS, Svelte and Vitest presets from
 * `@dusk-network/eslint-config@4.0.1`, kept in the repo.
 */

import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier/flat";
import sveltePlugin from "eslint-plugin-svelte";
import vitest from "@vitest/eslint-plugin";

const jsBaseRules = {
  "array-callback-return": ["error", { allowImplicit: true }],
  "class-methods-use-this": 0,
  complexity: ["error", 14],
  "consistent-return": ["error", { treatUndefinedAsUnspecified: false }],
  "consistent-this": "error",
  curly: ["error", "all"],
  "default-case": "error",
  "dot-notation": "error",
  eqeqeq: "error",
  "max-depth": ["error", 3],
  "max-nested-callbacks": ["error", 3],
  "max-params": ["error", 5],
  "max-statements": ["error", 15, { ignoreTopLevelFunctions: true }],
  "new-cap": ["error", { newIsCap: true, properties: true }],
  "no-alert": "error",
  "no-array-constructor": "error",
  "no-caller": "error",
  "no-console": "error",
  "no-duplicate-imports": ["error", { includeExports: true }],
  "no-eval": "error",
  "no-extend-native": "error",
  "no-extra-bind": "error",
  "no-extra-label": "error",
  "no-implicit-globals": "error",
  "no-implied-eval": "error",
  "no-iterator": "error",
  "no-label-var": "error",
  "no-labels": "error",
  "no-lone-blocks": "error",
  "no-loop-func": "error",
  "no-nested-ternary": 0,
  "no-new": "error",
  "no-octal-escape": "error",
  "no-param-reassign": 0,
  "no-proto": "error",
  "no-prototype-builtins": "error",
  "no-restricted-globals": ["error", "event"],
  "no-return-assign": ["error", "always"],
  "no-script-url": "error",
  "no-self-compare": "error",
  "no-sequences": "error",
  "no-shadow": "error",
  "no-shadow-restricted-names": "error",
  "no-throw-literal": "error",
  "no-undef": "error",
  "no-undef-init": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": "error",
  "no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: false,
    },
  ],
  "no-unused-vars": [2, { args: "after-used" }],
  "no-use-before-define": [0, "nofunc"],
  "no-useless-call": "error",
  "no-useless-concat": "error",
  "no-useless-escape": "error",
  "no-var": "error",
  "no-with": "error",
  "prefer-const": [
    "error",
    {
      destructuring: "any",
      ignoreReadBeforeAssign: false,
    },
  ],
  radix: "error",
  strict: ["error", "function"],
  yoda: "error",
};

const jsStyleRules = {
  camelcase: "error",
  "no-warning-comments": ["error", { location: "anywhere" }],
  "one-var": ["error", "never"],
  "prefer-template": "error",
  "sort-imports": [
    "error",
    {
      allowSeparatedGroups: true,
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
    },
  ],
  "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }],
};

const svelteBaseRules = {
  "svelte/button-has-type": [
    "error",
    {
      button: true,
      reset: true,
      submit: true,
    },
  ],
  "svelte/html-closing-bracket-spacing": [
    "error",
    {
      selfClosingTag: "always",
    },
  ],
  "svelte/infinite-reactive-loop": "error",
  "svelte/no-at-debug-tags": "error",
  "svelte/no-at-html-tags": "error",
  "svelte/no-dom-manipulating": "error",
  "svelte/no-dupe-else-if-blocks": "error",
  "svelte/no-dupe-on-directives": "error",
  "svelte/no-dupe-style-properties": "error",
  "svelte/no-dupe-use-directives": "error",
  "svelte/no-dynamic-slot-name": "error",
  "svelte/no-immutable-reactive-statements": "error",
  "svelte/no-not-function-handler": "error",
  "svelte/no-reactive-functions": "error",
  "svelte/no-reactive-literals": "error",
  "svelte/no-reactive-reassign": "error",
  "svelte/no-shorthand-style-property-overrides": "error",
  "svelte/no-store-async": "error",
  "svelte/no-target-blank": [
    "error",
    {
      allowReferrer: false,
      enforceDynamicLinks: "always",
    },
  ],
  "svelte/no-unknown-style-directive-property": "error",
  "svelte/no-unused-svelte-ignore": "error",
  "svelte/no-useless-mustaches": [
    "error",
    {
      ignoreIncludesComment: true,
      ignoreStringEscape: true,
    },
  ],
  "svelte/prefer-destructured-store-props": "error",
  "svelte/require-each-key": "error",
  "svelte/require-optimized-style-attribute": 0,
  "svelte/require-store-callbacks-use-set-param": "error",
  "svelte/require-store-reactive-access": "error",
  "svelte/require-stores-init": "error",
  "svelte/valid-compile": ["error", { ignoreWarnings: false }],
  "svelte/valid-each-key": "error",
};

const svelteStyleRules = {
  "svelte/comment-directive": [
    "error",
    { reportUnusedDisableDirectives: true },
  ],
  "svelte/derived-has-same-inputs-outputs": "error",
  "svelte/no-restricted-html-elements": [
    "error",
    {
      elements: [
        "applet",
        "basefont",
        "center",
        "dir",
        "embed",
        "font",
        "image",
        "isindex",
        "listing",
        "marquee",
        "menuitem",
        "plaintext",
        "s",
        "strike",
        "u",
        "xmp",
      ],
      message: "Do not use deprecated HTML tags",
    },
  ],
  "svelte/spaced-html-comment": ["error", "always"],
};

const vitestBaseRules = {
  "max-nested-callbacks": ["error", 5],
  "max-statements": 0,
};

/** @type {import("eslint").Linter.Config[]} */
export const jsEsLintConfig = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    rules: {
      ...jsBaseRules,
      ...jsStyleRules,
    },
  },
  prettierConfig,
  {
    languageOptions: {
      // the import plugin sets it to "2018" which overrides the default,
      // so by good measure we specify even the source type.
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];

/** @type {import("eslint").Linter.Config[]} */
export const svelteEsLintConfig = [
  ...jsEsLintConfig,
  ...sveltePlugin.configs.recommended,
  ...sveltePlugin.configs.prettier,
  {
    languageOptions: {
      // the import plugin sets it to "2018" which overrides the default,
      // so by good measure we specify even the source type.
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-undef-init": 0,
      ...svelteBaseRules,
      ...svelteStyleRules,
    },
    settings: {
      // ignoring svelte files temporarily because right
      // now we are having problems with the import plugin
      "import/ignore": ["node_modules", "\\.svelte$"],
      "import/parsers": {
        espree: [".js", "*.cjs", "*.mjs"],
        "svelte-eslint-parser": [".svelte"],
      },
    },
  },
];

/** @type {import("eslint").Linter.Config[]} */
export const vitestEsLintConfig = [
  ...jsEsLintConfig,
  vitest.configs.recommended,
  {
    languageOptions: {
      // the import plugin sets it to "2018" which overrides the default,
      // so by good measure we specify even the source type.
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: vitestBaseRules,
  },
];
