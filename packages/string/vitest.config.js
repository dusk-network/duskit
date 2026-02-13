import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.{js,ts}"],
      provider: "istanbul",
      thresholds: { 100: true },
    },
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,ts}"],
    setupFiles: ["./vite-setup.js"],
  },
});
