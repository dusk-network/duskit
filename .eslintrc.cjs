module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: ["@dusk-network/eslint-config/js", "turbo"],
  ignorePatterns: [
    "apps/**",
    "packages/**",
    "!.prettierrc.js",
    "!.eslintrc.cjs",
  ],
  parserOptions: {
    project: true,
  },
  root: true,
};
