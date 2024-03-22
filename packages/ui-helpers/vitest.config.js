import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    test: {
      include: ["src/**/*.{test,spec}.{js,ts}"],
    },
  };
});
