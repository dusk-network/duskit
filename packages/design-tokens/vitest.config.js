import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["src/**", "bin/lib", "bin/stage"],
      provider: "istanbul",
      thresholds: { 100: true },
    },
    environment: "node",
    include: ["{src,bin}/**/*.{test,spec}.{js,ts}"],
  },
});
