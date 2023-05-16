import { svelte } from "@sveltejs/vite-plugin-svelte";
import { HstSvelte } from "@histoire/plugin-svelte";
import dusk from "@dusk-network/tokens/plugin/index.js";

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
		vite: {
			base: process.env.VITE_GITHUB_PAGES ? "/dusk-website/" : "",
		},
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
			favicon: "./static/favicon.svg",
			logo: {
				square: "./static/logo-mark.svg",
				light: "./static/logo.svg",
				dark: "./static/logo.svg",
			},
			colors: {
				gray: {
					50: "#fafafa",
					100: "#f4f4f5",
					200: "#e4e4e7",
					300: "#d4d4d8",
					400: "#a1a1aa",
					500: "#636167",
					600: "#52525b",
					700: "#3f3f46",
					750: "#323238",
					800: "#27272a",
					850: "#1f1f21",
					900: "#18181b",
					950: "#101012",
				},
				primary: {
					50: "#e5f0ff",
					100: "#bfd7ff",
					200: "#94c1ff",
					300: "#63aaf7",
					400: "#338feb",
					500: "#71b1ff",
					600: "#2e8cdb",
					700: "#1c6ed4",
					800: "#1159c7",
					900: "#0d4dab",
				},
			},
			logoHref: "https://dusk.network",
			defaultColorScheme: "light",
			hideColorSchemeSwitch: true,
			storeColorScheme: false,
		},
		backgroundPresets: [
			{
				label: "Transparent",
				color: "transparent",
				contrastColor: "#2E2D30",
			},
			{
				label: "Gray",
				color: "#E2DFE9",
				contrastColor: "#101010",
			},
			{
				label: "Smokey",
				color: "#101010",
				contrastColor: "#E2DFE9",
			},
		],
		responsivePresets: [
			{
				label: "Default",
				width: 375,
				height: 812,
			},
			{
				label: "Small Screen",
				width: 640,
				height: 480,
			},
			{
				label: "Medium Screen",
				width: 768,
				height: 1024,
			},
			{
				label: "Large Screen",
				width: 1020,
				height: 768,
			},
			{
				label: "X-Large Screen",
				width: 1280,
				height: null,
			},
			{
				label: "2XL-Large Screen",
				width: 1536,
				height: null,
			},
			{
				label: "3XL-Large Screen",
				width: 1700,
				height: null,
			},
		],
	},
};

export default config;
