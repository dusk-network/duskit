module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    "@dusk-network/eslint-config/js"
  ],
  ignorePatterns: ["apps/**", "packages/**"],
  parserOptions: {
    project: true
  },
  root: true
};
