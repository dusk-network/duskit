module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    "@dusk-network/eslint-config/js",
    "@dusk-network/eslint-config/svelte",
  ],
  globals: {
    CONFIG: false,
  },
  root: true,
};
