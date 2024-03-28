import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    test: {
      coverage: {
        all: true,
        include: ["src/**"],
        provider: "istanbul",
      },
      include: ["src/**/*.{test,spec}.{js,ts}"],
    },
  };
});
