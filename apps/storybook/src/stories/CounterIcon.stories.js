import { CounterIcon } from "@duskit/components";
import { mdiBell, mdiEmail, mdiAccount, mdiMessage } from "@mdi/js";

export default {
  title: "Components/CounterIcon",
  component: CounterIcon,
  argTypes: {
    baseIconPath: {
      control: "select",
      options: ["Bell", "Email", "Account", "Message"],
      mapping: {
        Bell: mdiBell,
        Email: mdiEmail,
        Account: mdiAccount,
        Message: mdiMessage,
      },
      description: "The main SVG path of the icon",
    },
    count: {
      control: { type: "range", min: 0, max: 15, step: 1 },
      description:
        "The notification count (triggers bounce animation on change)",
    },
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "Predefined icon sizes",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    // should be a svg path, but because of
    // storybook's mapping we need to use
    // the string option
    baseIconPath: "Bell",
    count: 1,
    size: "default",
  },
};

export const Default = {
  args: {
    count: 3,
  },
};

/**
 * Test different sizes to ensure the badge
 * scaling and positioning remain consistent.
 */
export const Large = {
  args: {
    size: "large",
    count: 7,
  },
};

/**
 * Test different sizes to ensure the badge
 * scaling and positioning remain consistent.
 */
export const Small = {
  args: {
    size: "small",
    count: 5,
  },
};

/**
 * Demonstrates how the component handles zero.
 * The badge should disappear completely.
 */
export const ZeroCount = {
  args: {
    count: 0,
  },
};

/**
 * Demonstrates the "+9" badge logic.
 * Any value greater than 9 triggers the '9+' icon.
 */
export const HighCount = {
  args: {
    count: 12,
  },
};
