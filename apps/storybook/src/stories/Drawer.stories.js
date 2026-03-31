import DrawerExample from "./_examples/DrawerExample.svelte";

export default {
  argTypes: {
    from: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    interactive: {
      table: {
        disable: true,
      },
    },
    open: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["default", "full", "large", "small"],
    },
  },
  component: DrawerExample,
  title: "Components/Drawer",
};

export const Default = {
  args: {
    from: "left",
    interactive: false,
    open: false,
    size: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The default drawer. Use the `open` control in the Storybook panel to toggle its visibility and test external prop updates.",
      },
    },
  },
};

export const Interactive = {
  args: {
    from: "left",
    interactive: true,
    open: false,
    size: "default",
  },
  parameters: {
    controls: {
      exclude: ["open"],
    },
    docs: {
      description: {
        story:
          "An interactive drawer handling its own internal state. The `open` control is disabled here. Click the button to open it, and click anywhere outside or press the `Ecape` key to close it.",
      },
    },
  },
};
