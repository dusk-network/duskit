module.exports = {
	root: true,
	extends: ["@dusk-network"],
	parserOptions: {
		ecmaVersion: 2023,
	},
	settings: {
		next: {
			rootDir: ["apps/*/"],
		},
	},
};
