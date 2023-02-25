import sveltePreprocess from "svelte-preprocess";

export default {
	preprocess: sveltePreprocess({
		postcss: {
			configFilePath: "./node_modules/@dusk-network/tokens/postcss.config.cjs",
		},
	}),
};
