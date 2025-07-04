/** @type {import("typedoc").TypeDocOptions} */
const config = {
  cacheBust: true,
  cleanOutputDir: true,
  entryPoints: [
    "packages/array",
    "packages/date",
    "packages/encoding",
    "packages/error",
    "packages/http",
    "packages/math",
    "packages/promise",
    "packages/string",
    "packages/svelte-stores",
    "packages/test-helpers",
  ],
  entryPointStrategy: "packages",
  includeHierarchySummary: true,
  includeVersion: true,
  out: "./docs",
  plugin: ["typedoc-plugin-dt-links", "typedoc-plugin-mdn-links"],
};

export default config;
