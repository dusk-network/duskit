// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["src/**"],
      provider: "istanbul",
    },
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
