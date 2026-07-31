import TooltipExample from "./_examples/TooltipExample.svelte";

export default {
  title: "Components/Display/Tooltip",
  component: TooltipExample,
  argTypes: {
    defaultDelayHide: { control: "number" },
    defaultDelayShow: { control: "number" },
    defaultOffset: { control: "number" },
    defaultPlace: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
      ],
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
