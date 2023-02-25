import adapter from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";
import metadata from "@dusk-network/meta/index.cjs";

const getEntries = (obj) => {
	let entries = ["/", "/components"];
	Object.keys(obj).forEach((pkg) => {
		entries.push(`/components/${pkg}`);

		Object.keys(obj[pkg]).forEach((component) => {
			entries.push(`/components/${pkg}/${component}`);
		});
	});

	return entries;
};

const entries = getEntries(metadata);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			crawl: false,
			entries: entries,
		},
		paths: {
			base: process.env.NODE_ENV === "production" ? "/duskit/docs" : "",
		},
		appDir: "internal", // Needed to work with Github pages.
	},
	preprocess: sveltePreprocess({
		postcss: {
			configFilePath: "./node_modules/@dusk-network/tokens/postcss.config.cjs",
		},
	}),
};

export default config;
