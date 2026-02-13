import { CopyField } from "@duskit/components";

// CopyField assumes navigator.clipboard exists.
try {
  if (typeof navigator !== "undefined" && !("clipboard" in navigator)) {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {},
      },
    });
  }
} catch {
  // noop: if the environment disallows patching navigator, the story still loads.
}

export default {
  title: "Components/CopyField",
  component: CopyField,
  argTypes: {
    disabled: { control: "boolean" },
    displayValue: { control: "text" },
    name: { control: "text" },
    rawValue: { control: "text" },
    tooltipId: { control: "text" },
  },
};

export const Default = {
  args: {
    name: "Address",
    displayValue: "dusk1q...7a3p",
    rawValue: "dusk1qz6f8m3y2q0m2w7v6k5c4b3n2m1qz6f8m3y2q0m2w7v",
    tooltipId: "main-tooltip",
    disabled: false,
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

