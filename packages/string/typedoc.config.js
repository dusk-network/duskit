/** @type {import("typedoc").TypeDocOptions} */
const config = {
  cacheBust: true,
  cleanOutputDir: true,
  includeHierarchySummary: true,
  includeVersion: true,
  out: "./docs",
  plugin: ["typedoc-plugin-dt-links", "typedoc-plugin-mdn-links"],
};

export default config;
