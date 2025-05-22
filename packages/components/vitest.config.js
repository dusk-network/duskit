import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    /**
     * @see https://github.com/vitest-dev/vitest/issues/2834
     * @see https://github.com/testing-library/svelte-testing-library/issues/222#issuecomment-1588987135
     */
    alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
    coverage: {
      all: true,
      include: ["src/**"],
      provider: "istanbul",
    },
    environment: "jsdom",
    globalSetup: ["./vite-global-setup.js"],
    include: ["src/**/*.{test,spec}.{js,ts}"],
    setupFiles: ["./vite-setup.js"],
  },
});
