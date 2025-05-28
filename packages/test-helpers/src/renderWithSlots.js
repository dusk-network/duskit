import { render } from "@testing-library/svelte";

import SlotContent from "./SlotContent.svelte";

/** @type {import("..").renderWithSlots} */
const renderWithSlots = (slots) => (Component, options, renderOptions) =>
  render(
    SlotContent,
    {
      ...options,
      props: {
        Component,
        componentOptions: options?.props,
        text: slots.default,
      },
    },
    renderOptions
  );

export default renderWithSlots;
