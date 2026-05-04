import { withThemeByClassName } from "@storybook/addon-themes";

import "@duskit/css/main.css";

import "../src/storybook.css";

import WithOverlays from "./WithOverlays.svelte";

/** @type {import("@storybook/svelte").Preview} */
const preview = {
  decorators: [
    (Story, context) =>
      context.parameters?.disableGlobalOverlays ? Story() : WithOverlays,
    withThemeByClassName({
      defaultTheme: "light",
      parentSelector: "html",
      themes: {
        dark: "dark",
        light: "",
      },
    }),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
