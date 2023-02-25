const postCssConfig = require("../postcss.config.cjs");

module.exports = function VitePluginDusk(options = {}) {
	const config = Object.assign(
		{
			cssPath: "../tailwind.css",
			virtualFileId: "@tailwindcss",
		},
		options,
	);
	return [
		{
			name: "vite-plugin-dusk-storybook",
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
	];
};
