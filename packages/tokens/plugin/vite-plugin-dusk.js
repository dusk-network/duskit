import { VitePluginDuskViewer } from "./vite-plugin-dusk-viewer.js";
import tailwindConfig from "../dusk.tailwind.config.cjs";
import postCssConfig from "../postcss.config.cjs";

export function VitePluginDusk(options = {}) {
	const config = Object.assign(
		{
			cssPath: "../tailwind.css",
			virtualFileId: "@tailwindcss",
			viewer: {
				path: "/_tailwind/",
				open: false,
			},
		},
		options,
	);
	return [
		{
			name: "vite-plugin-dusk",
			config: (_, env) => {
				process.env.NODE_ENV = env.mode;
				const plugins = postCssConfig.plugins;
				return {
					css: {
						postcss: {
							plugins,
						},
					},
				};
			},
			resolveId(id) {
				if (id === config.virtualFileId) {
					return config.cssPath;
				}
			},
		},
		VitePluginDuskViewer(
			Object.assign(Object.assign({}, config.viewer), {
				tailwind: tailwindConfig,
			}),
		),
	];
}
