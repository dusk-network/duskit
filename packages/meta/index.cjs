const path = require("path");

let output = {};

function getMetaDataFromPackageFiles(cwd) {
	require("tiny-glob/sync")("**/*([a-zA-Z]).svelte", { cwd }).forEach((file) => {
		const filename = path.basename(file, ".svelte");
		const component = path.dirname(file).split(path.sep)[0];

		if (filename.startsWith("_")) return;
		if (!output[component]) output[component] = {};

		output[component][filename] = Object.assign(
			require("svelte-docster")({ file: path.join(cwd, file) }),
			{
				all: undefined,
				module: undefined,
			},
		);
	});
}

["components", "utilities", "tokens"].forEach((pkg) =>
	getMetaDataFromPackageFiles(path.resolve(__dirname, `../${pkg}`)),
);

module.exports = output;
