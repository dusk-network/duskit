import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import metadata from "@dusk-network/meta/index.cjs";
import dusk from "@dusk-network/tokens/plugin/index.js";

const virtualMetaPlugin = () => {
	const virtualFileId = "@duskit-meta";
	return {
		name: "duskit-meta-plugin",
		resolveId(id) {
			if (id === virtualFileId) {
				return virtualFileId;
			}
		},
		load(id) {
			if (id === virtualFileId) {
				return `export default JSON.parse(${JSON.stringify(JSON.stringify(metadata))})`;
			}
		},
	};
};

function getFiles(dir) {
	let results = [];

	fs.readdirSync(dir).forEach(function (file) {
		file = dir + "/" + file;

		let stat = fs.statSync(file);

		if (stat && stat.isDirectory()) {
			results = results.concat(getFiles(file));
		} else {
			const extension = file.split(".").pop();

			if (extension == "svelte") results.push(file);
		}
	});

	return results;
}

const virtualExamplePlugin = () => {
	const virtualFileId = "@duskit-example";
	return {
		name: "duskit-example-plugin",
		resolveId(id) {
			if (id === virtualFileId) {
				return virtualFileId;
			}
		},
		load(id) {
			if (id === virtualFileId) {
				let examples = {};
				const files = getFiles("./node_modules/@dusk-network/duskit-examples/src");

				files.forEach((file) => {
					const data = fs.readFileSync(file, "utf8");
					const pathData = path.parse(file).dir.split("/");

					pathData.splice(0, 2);

					if (!examples[pathData[0]]) examples[pathData[0]] = {};
					if (!examples[pathData[0]][pathData[1]]) examples[pathData[0]][pathData[1]] = {};

					examples[pathData[0]][pathData[1]][path.parse(file).name] = data;
				});

				return `export default JSON.parse(${JSON.stringify(JSON.stringify(examples))})`;
			}
		},
	};
};

export default defineConfig({
	plugins: [
		virtualExamplePlugin(),
		virtualMetaPlugin(),
		dusk({
			cssPath: "./node_modules/@dusk-network/styles/tailwind.css",
		}),
		sveltekit(),
	],
});
