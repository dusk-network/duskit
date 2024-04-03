/* eslint-disable import/no-unresolved */

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

/* eslint-enable import/no-unresolved */

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    coverage: {
      all: true,
      include: ["src/**"],
      provider: "istanbul",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
    passWithNoTests: true,
  },
});
