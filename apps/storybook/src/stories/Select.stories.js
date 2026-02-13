import { Select } from "@duskit/components";

const flatOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "pear", label: "Pear" },
];

const groupedOptions = {
  Fruits: flatOptions,
  Vegetables: [
    { value: "carrot", label: "Carrot" },
    { value: "potato", label: "Potato" },
  ],
};

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    options: { control: "object" },
    value: { control: "text" },
  },
};

export const Flat = {
  args: {
    options: flatOptions,
    value: "banana",
  },
};

export const Grouped = {
  args: {
    options: groupedOptions,
    value: "carrot",
  },
};

