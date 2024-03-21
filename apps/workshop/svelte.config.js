import sveltePreprocess from "svelte-preprocess";

export default {
  preprocess: sveltePreprocess({
    postcss: {
      configFilePath:
        "./node_modules/@duskit/design-tokens/src/postcss.config.cjs",
    },
  }),
};
