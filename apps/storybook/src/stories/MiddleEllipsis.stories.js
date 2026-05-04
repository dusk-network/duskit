import { MiddleEllipsis } from "@duskit/components";

export default {
  title: "Components/MiddleEllipsis",
  component: MiddleEllipsis,
  argTypes: {
    as: { control: "select", options: ["pre", "div", "code"] },
    text: { control: "text" },
  },
};

export const Default = {
  args: {
    as: "pre",
    style:
      "width: 100%;max-width: 240px; display: block; border: 1px dashed currentcolor; padding: 0.5rem; border-radius: 0.75rem;",
    text: "dusk1qz6f8m3y2q0m2w7v6k5c4b3n2m1qz6f8m3y2q0m2w7v6k5c4b3n2m1a",
  },
};
