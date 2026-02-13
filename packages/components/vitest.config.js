import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  resolve: {
    // Vitest runs in Node, but these are DOM tests (jsdom). Prefer browser export
    // conditions so Svelte resolves to the client runtime (where `mount()` exists).
    conditions: ["browser"],
  },
  test: {
    coverage: {
      include: ["src/**/*.{js,ts,svelte}"],
      provider: "istanbul",
    },
    environment: "jsdom",
    globalSetup: ["./vite-global-setup.js"],
    include: ["src/**/*.{test,spec}.{js,ts}"],
    setupFiles: ["./vite-setup.js"],
  },
});
