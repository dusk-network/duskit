import { svelte } from "@sveltejs/vite-plugin-svelte";

// eslint-disable-next-line import/named
import { HstSvelte as hst } from "@histoire/plugin-svelte";

/** @type {import('vite').UserConfig} */
const config = {
  histoire: {
    backgroundPresets: [
      {
        color: "transparent",
        contrastColor: "#2E2D30",
        label: "Transparent",
      },
      {
        color: "#E2DFE9",
        contrastColor: "#101010",
        label: "Gray",
      },
      {
        color: "#101010",
        contrastColor: "#E2DFE9",
        label: "Smokey",
      },
    ],
    plugins: [hst()],
    responsivePresets: [
      {
        height: 812,
        label: "Default",
        width: 375,
      },
      {
        height: 480,
        label: "Small Screen",
        width: 640,
      },
      {
        height: 1024,
        label: "Medium Screen",
        width: 768,
      },
      {
        height: 768,
        label: "Large Screen",
        width: 1020,
      },
      {
        height: null,
        label: "X-Large Screen",
        width: 1280,
      },
      {
        height: null,
        label: "2XL-Large Screen",
        width: 1536,
      },
      {
        height: null,
        label: "3XL-Large Screen",
        width: 1700,
      },
    ],
    setupFile: "/src/init.js",
    theme: {
      colors: {
        gray: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#e2e2e2",
          400: "#c9c9c9",
          500: "#b0b0b0",
          600: "#9a9a9a",
          700: "#828282",
          750: "#6c6c6c",
          800: "#565656",
          850: "#424242",
          900: "#2e2e2e",
          950: "#101010",
        },
        primary: {
          50: "#d6e4fb",
          100: "#acccfd",
          200: "#71b1ff",
          300: "#39a0ff",
          400: "#0188e3",
          500: "#0271bd",
          600: "#015a99",
          700: "#004578",
          800: "#053155",
          900: "#061d34",
        },
      },
      defaultColorScheme: "light",
      favicon: "./static/favicon.svg",
      logo: {
        dark: "./src/lib/logo/combination-mark-light.svg",
        light: "./src/lib/logo/combination-mark-dark.svg",
        square: "./src/lib/logo/symbol.svg",
      },
      logoHref: "https://dusk.network",
      storeColorScheme: false,
      title: "Duskit",
    },
    tree: {
      groups: [
        {
          id: "top",
          title: "",
        },
        {
          id: "foundations",
          title: "Foundations",
        },
        {
          id: "design-tokens",
          title: "Design Tokens",
        },
        {
          id: "patterns",
          title: "Patterns",
        },
        {
          id: "components",
          title: "Components",
        },
      ],
    },
    vite: {
      base: process.env.VITE_GITHUB_PAGES ? "/workshop/" : "",
    },
  },
  plugins: [svelte()],
  publicDir: "static",
};

export default config;
