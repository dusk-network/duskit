import { Table } from "@duskit/components";

const data = [
  { name: "Alice", age: 29, role: "Engineer" },
  { name: "Bob", age: 34, role: "Designer" },
  { name: "Charlie", age: 27, role: "QA" },
  { name: "Dana", age: 41, role: "PM" },
];

const descriptors = [
  { name: "name", label: "Name", sortable: true },
  {
    name: "age",
    label: "Age",
    sortable: true,
    renderer: (value) => `${value} yrs`,
  },
  { name: "role", label: "Role" },
  {
    name: "status",
    label: "Status",
    renderer: (row) => (row.age >= 35 ? "Senior" : "Core"),
  },
];

export default {
  title: "Components/Display/Table",
  component: Table,
  argTypes: {
    caption: { control: "text" },
    data: { control: false },
    descriptors: { control: false },
  },
};

export const AutoDescriptors = {
  args: {
    caption: "Auto descriptors (no sorting)",
    data,
    style: "max-width: 720px;",
  },
};

export const WithDescriptors = {
  args: {
    caption: "Custom descriptors (sortable)",
    data,
    descriptors,
    style: "max-width: 720px;",
  },
};
