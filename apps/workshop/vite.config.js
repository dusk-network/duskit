import { svelte } from "@sveltejs/vite-plugin-svelte";
import { HstSvelte } from "@histoire/plugin-svelte";
import dusk from "@dusk-network/tokens/plugin/index.js";
import { defaultColors } from "histoire";
// import tailwindConfig from "@dusk-network/tokens/dusk.tailwind.config.cjs";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		dusk({
			cssPath: "./node_modules/@dusk-network/styles/tailwind.css",
		}),
		svelte(),
	],
	publicDir: "static",
	histoire: {
		plugins: [HstSvelte()],
		setupFile: "/src/init.js",
		tree: {
			groups: [
				{
					id: "top",
					title: "",
				},
				{
					id: "components",
					title: "Components",
				},
			],
		},
		theme: {
			title: "Duskit",
			hideColorSchemeSwitch: true,
			logo: {
				square: "./theme/logo-square.svg",
				light: "./theme/logo-light.svg",
				dark: "./theme/logo-dark.svg",
			},
			logoHref: "/",
			favicon: "./static/favicon.png",

			colors: {
				gray: defaultColors.zinc,
				primary: defaultColors.sky,
			},
		},
		backgroundPresets: [
			{
				label: "Transparent",
				color: "transparent",
				contrastColor: "#333",
			},
			{
				label: "Light Gray",
				color: "#E2DFE9",
				contrastColor: "#101010",
			},
			{
				label: "Smokey Black",
				color: "#101010",
				contrastColor: "#E2DFE9",
			},
		],
	},
	// server: {
	//   open: '/story/src-introduction-story-js'
	// },
};

export default config;
