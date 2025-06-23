import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/array/vitest.config.js",
  "./packages/encoding/vitest.config.js",
  "./packages/components/vitest.config.js",
  "./packages/date/vitest.config.js",
  "./packages/error/vitest.config.js",
  "./packages/http/vitest.config.js",
  "./packages/math/vitest.config.js",
  "./packages/promise/vitest.config.js",
  "./packages/string/vitest.config.js",
  "./packages/svelte-stores/vitest.config.js",
  "./packages/test-helpers/vitest.config.js",
]);
