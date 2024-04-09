module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    "@dusk-network/eslint-config/js",
    "@dusk-network/eslint-config/svelte",
    "@dusk-network/eslint-config/vitest",
  ],
  overrides: [
    {
      files: ["*.spec.js", "*.test.js"],
      rules: {
        "max-nested-callbacks": ["error", 4],
      },
    },
  ],
  root: true,
};
