const tailwindConfig = require("./dusk.tailwind.config.cjs");
const postcssImport = require("postcss-import");
const postcssUrl = require("postcss-url");
const postcssInputRange = require("postcss-input-range");
const postcssNestedAncestors = require("postcss-nested-ancestors");
const nesting = require("tailwindcss/nesting");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const customSelectors = require("postcss-custom-selectors");

module.exports = {
	plugins: [
		postcssImport,
		postcssUrl,
		customSelectors,
		postcssInputRange,
		postcssNestedAncestors,
		nesting,
		tailwindcss(tailwindConfig),
		autoprefixer,
	],
};
