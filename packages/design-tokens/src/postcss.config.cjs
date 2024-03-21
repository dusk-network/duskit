const postcssImport = require("postcss-import");
const postcssUrl = require("postcss-url");
const postcssInputRange = require("postcss-input-range");
const postcssNesting = require("postcss-nesting");
const autoprefixer = require("autoprefixer");
const postcssCustomSelectors = require("postcss-custom-selectors");

module.exports = {
  plugins: [
    postcssImport,
    postcssUrl,
    postcssCustomSelectors,
    postcssInputRange,
    postcssNesting,
    autoprefixer,
  ],
};
