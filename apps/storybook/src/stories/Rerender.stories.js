import { Rerender } from "@duskit/components";

export default {
  title: "Components/Rerender",
  component: Rerender,
  argTypes: {
    generateValue: { control: false },
    interval: { control: "number" },
  },
};

export const Clock = {
  args: {
    interval: 1000,
    generateValue: () => new Date().toLocaleTimeString(),
    style:
      "display: inline-block; font-family: var(--mono-font-family); padding: 0.5rem 0.75rem; border: 1px dashed var(--divider-color-primary); border-radius: 0.75rem;",
  },
};

