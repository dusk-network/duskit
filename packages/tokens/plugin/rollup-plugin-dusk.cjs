const postcss = require("rollup-plugin-postcss");
const path = require("path");
// const postCssConfig = require("../postcss.config.cjs");

const postcssProcessor = ({ postcss = [], purge = false }) => {
	const tailwindConfig = require("../dusk.tailwind.config.cjs");
	return [
		require("postcss-import")(),
		require("postcss-url")(),
		require("postcss-input-range")(),
		require("postcss-nested-ancestors")(),
		require("postcss-nested")(),
		require("tailwindcss")(tailwindConfig),
		require("autoprefixer")(),
		...postcss,
	].filter(Boolean);
};

// function moveGlobalCssToStatic({ dir, file }, output) {
//   let directory;
//   if (dir && !file) {
//     // single file asset
//     directory = dir;
//   } else if (!dir && file) {
//     // chunks
//     directory = path.dirname(file);
//   }

//   if (directory === path.dirname(output)) {
//     return;
//   }

//   const fs = require("fs");
//   const cssFile = path.basename(output);
//   if (fs.existsSync(path.resolve(directory, cssFile))) {
//     fs.copyFileSync(path.resolve(directory, cssFile), path.resolve(output));
//     fs.unlinkSync(path.resolve(directory, cssFile));

//     console.log(
//       `rollup-plugin-duk:
//         moved ${cssFile}
//         from ${path.resolve(directory, cssFile)}
//         to ${path.resolve(output)}`,
//     );
//   }
// }

const plugins = (config) => postcssProcessor(config || {});

module.exports = (config = {}) => {
	const defaultOutput = "./global.css";
	const pcss = postcss({
		plugins: plugins(config),
		extract: path.basename(config.output || defaultOutput),
	});
	const oldWriteBundle = pcss.writeBundle;
	pcss.writeBundle = function () {
		if (oldWriteBundle) {
			oldWriteBundle.apply(this, arguments);
		}
		// arguments[0]: OutputOptions
		// moveGlobalCssToStatic(arguments[0], config.output || defaultOutput);
	};

	return pcss;
};
