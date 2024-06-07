import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/currency/vitest.config.js",
  "./packages/error/vitest.config.js",
  "./packages/string/vitest.config.js",
  "./packages/test-helpers/vitest.config.js",
  "./packages/http/vitest.config.js",
  "./packages/components/vitest.config.js",
]);
