import { defineConfig } from "vite";
/* eslint-disable import/no-unresolved */
import { svelte } from "@sveltejs/vite-plugin-svelte";
/* eslint-enable import/no-unresolved */

export default defineConfig(() => {
  return {
    plugins: [svelte({ hot: !process.env.VITEST })],
    test: {
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{js,ts}"],
      setupFiles: ["./vite-setup.js"],
    },
  };
});
