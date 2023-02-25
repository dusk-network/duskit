import createServer from "tailwind-config-viewer/server/index.js";

export function VitePluginDuskViewer(options = {}) {
	const config = Object.assign({ path: "/_tailwind/", open: false, tailwind: {} }, options);

	return {
		name: "vite-plugin-dusk-viewer",
		apply: "serve",
		configureServer(viteServer) {
			const server = createServer({
				tailwindConfigProvider: () => config.tailwind,
			}).asMiddleware();

			viteServer.middlewares.use(config.path, server);
		},
	};
}
