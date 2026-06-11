import HeadingExample from "./_examples/HeadingExample.svelte";

export default {
  argTypes: {
    as: {
      control: "select",
      options: ["div", "h1", "h2", "h3", "h4", "h5", "h6", "span"],
    },
    mono: { control: "boolean" },
    prominence: {
      control: "select",
      options: ["hero", "major", "strong", "standard", "minor", "subtle"],
    },
    text: { control: "text" },
    textAlign: {
      control: "inline-radio",
      options: ["center", "end", "start"],
    },
    uppercase: { control: "boolean" },
    variant: {
      control: "select",
      options: [
        "bracketed-neutral",
        "bracketed-primary",
        "bracketed-secondary",
        "plain",
      ],
    },
  },
  args: {
    as: "h2",
    mono: false,
    prominence: "standard",
    text: "Dusk Design System",
    uppercase: false,
    variant: "plain",
  },
  component: HeadingExample,
  title: "Components/Display/Heading",
};

export const Default = {};

export const Bracketed = {
  args: {
    prominence: "major",
    text: "Structural Identity",
    variant: "bracketed-primary",
  },
};

export const Technical = {
  args: {
    mono: true,
    prominence: "subtle",
    text: "System Log 0.1",
    uppercase: true,
    variant: "bracketed-neutral",
  },
};
