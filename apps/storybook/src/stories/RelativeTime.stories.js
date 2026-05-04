import { RelativeTime } from "@duskit/components";

export default {
  title: "Components/RelativeTime",
  component: RelativeTime,
  argTypes: {
    autoRefresh: { control: "boolean" },
    date: { control: false },
  },
};

export const Static = {
  args: {
    date: new Date(Date.now() - 5 * 60 * 1000),
    autoRefresh: false,
  },
};

export const AutoRefresh = {
  args: {
    // date: new Date(Date.now() - 2 * 60 * 1000),
    date: new Date(),
    autoRefresh: true,
  },
};
