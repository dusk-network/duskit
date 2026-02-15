import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { skipIn } from "lamb";

import { Checkbox } from "../..";

vi.mock("@duskit/string", async (importOriginal) => {
  /** @type {typeof import("@duskit/string")} */
  const original = await importOriginal();

  return {
    ...original,
    randomUUID: () => "some-generated-id",
  };
});

describe("Checkbox", () => {
  const baseProps = {
    id: "test",
    name: "test",
  };

  afterEach(cleanup);

  it("renders the Checkbox component", () => {
    const { container } = render(Checkbox, baseProps);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should generate an id if it's not received by props", () => {
    const { component } = render(Checkbox, {
      props: { ...skipIn(baseProps, ["id"]) },
    });
    const element = component.getRootElement();

    expect(element).toHaveAttribute("id", "dusk-checkbox-some-generated-id");
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      "data-something": "some-value",
    };
    const { component } = render(Checkbox, props);
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-checkbox", "foo", "bar");
    expect(element).toHaveAttribute("data-something", "some-value");
  });

  it("should be able to render the Checkbox component in a checked state", () => {
    const { component } = render(Checkbox, {
      props: { ...baseProps, checked: true },
    });

    expect(component.getRootElement()).toBeChecked();
  });

  it("renders the Checkbox component in a disabled state", () => {
    const { component } = render(Checkbox, {
      props: { ...baseProps, disabled: true },
    });

    expect(component.getRootElement()).toBeDisabled();
  });

  it("renders the Checkbox component in a disabled, checked state", () => {
    const { component } = render(Checkbox, {
      props: { ...baseProps, checked: true, disabled: true },
    });
    const element = component.getRootElement();

    expect(element).toBeChecked();
    expect(element).toBeDisabled();
  });

  it("renders the Checkbox component and can transition to a checked state on click", async () => {
    const { component } = render(Checkbox, baseProps);
    const element = component.getRootElement();

    expect(element).not.toBeChecked();

    await fireEvent.click(element);

    expect(element).toBeChecked();
  });

  it("should forward the `on:change` handler to the underlying element", async () => {
    const handleChange = vi.fn();
    const { component } = render(Checkbox, {
      events: { change: handleChange },
      props: baseProps,
    });

    const element = component.getRootElement();

    await fireEvent.change(element);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(Checkbox, baseProps);
    const element = component.getRootElement();

    await rerender({
      checked: true,
      className: "baz",
      disabled: true,
      id: "some-custom-id",
      name: "some-new-name",
      tabindex: 2,
    });

    expect(element).toBeChecked();
    expect(element).toHaveClass("baz");
    expect(element).toBeDisabled();
    expect(element).toHaveAttribute("id", "some-custom-id");
    expect(element).toHaveAttribute("name", "some-new-name");
    expect(element).toHaveAttribute("tabindex", "2");
  });
});
