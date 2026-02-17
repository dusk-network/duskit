import TooltipExample from "./_examples/TooltipExample.svelte";

export default {
  title: "Components/Tooltip",
  component: TooltipExample,
  argTypes: {
    defaultDelayHide: { control: "number" },
    defaultDelayShow: { control: "number" },
    defaultOffset: { control: "number" },
    defaultPlace: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    defaultType: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    id: { control: "text" },
  },
};

export const Default = {
  args: {
    id: "demo-tooltip",
    defaultDelayHide: 0,
    defaultDelayShow: 250,
    defaultOffset: 10,
    defaultPlace: "top",
    defaultType: "info",
  },
};

