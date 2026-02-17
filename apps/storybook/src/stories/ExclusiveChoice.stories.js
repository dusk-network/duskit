import { ExclusiveChoice } from "@duskit/components";

export default {
  title: "Components/ExclusiveChoice",
  component: ExclusiveChoice,
  argTypes: {
    name: { control: "text" },
    options: { control: "object" },
    value: { control: "text" },
  },
};

export const Strings = {
  args: {
    name: "favorite-fruit",
    options: ["apple", "banana", "pear"],
    value: "banana",
  },
};

export const Objects = {
  args: {
    name: "plan",
    options: [
      { value: "basic", label: "Basic" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise", disabled: true },
    ],
    value: "pro",
  },
};

