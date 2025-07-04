/** @type {import("typedoc").TypeDocOptions} */
const config = {
  cacheBust: true,
  cleanOutputDir: true,
  externalSymbolLinkMappings: {
    global: {
      TypeError:
        "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError",
    },
  },
  includeHierarchySummary: true,
  includeVersion: true,
  out: "./docs",
  plugin: ["typedoc-plugin-dt-links", "typedoc-plugin-mdn-links"],
};

export default config;
