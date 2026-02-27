import DrawerExample from "./_examples/DrawerExample.svelte";

export default {
  title: "Components/Drawer",
  component: DrawerExample,
  argTypes: {
    from: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    size: {
      control: "select",
      options: ["default", "full", "large", "small"],
    },
  },
};

export const Default = {
  args: {
    from: "left",
    open: false,
    size: "default",
  },
};
