import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["src/**"],
      provider: "istanbul",
      thresholds: { 100: true },
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
