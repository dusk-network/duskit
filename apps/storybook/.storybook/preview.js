import "@duskit/css/src/base/index.css";
import "@duskit/css/src/theme.css";
import "../src/storybook.css";

import WithOverlays from "./WithOverlays.svelte";

/** @type {import("@storybook/svelte").Preview} */
const preview = {
  decorators: [
    (Story, context) =>
      context.parameters?.disableGlobalOverlays ? Story() : WithOverlays,
  ],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
