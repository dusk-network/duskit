import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import { getAsHTMLElement } from "@duskit/test-helpers";
import * as duskitString from "@duskit/string";

import { Agreement } from "../..";

describe("Agreement", () => {
  const randomUUIDSpy = vi
    .spyOn(duskitString, "randomUUID")
    .mockReturnValue("some-generated-id");

  const baseProps = {
    label: "I agree",
    name: "test",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  afterAll(() => {
    randomUUIDSpy.mockRestore();
  });

  it("should render the `Agreement` component", () => {
    const { component } = render(Agreement, baseOptions);
    const element = component.getRootElement();
    const checkbox = getAsHTMLElement(element, ".dusk-agreement__checkbox");
    const label = getAsHTMLElement(element, ".dusk-agreement__label");

    expect(element).toMatchSnapshot();
    expect(checkbox).toHaveAttribute("id", "dusk-checkbox-some-generated-id");
    expect(label).toHaveAttribute("for", "dusk-checkbox-some-generated-id");
  });

  it("should allow to set a custom id for the control", () => {
    const props = {
      ...baseProps,
      controlId: "custom-id",
    };
    const { component } = render(Agreement, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement();
    const checkbox = getAsHTMLElement(element, ".dusk-agreement__checkbox");
    const label = getAsHTMLElement(element, ".dusk-agreement__label");

    expect(checkbox).toHaveAttribute("id", props.controlId);
    expect(label).toHaveAttribute("for", props.controlId);
  });

  it("should pass additional class names and attributes to the rendered element", async () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(Agreement, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-agreement", "foo", "bar");
    expect(element).toHaveAttribute("id", "some-id");
  });

  it("should react to prop changes", async () => {
    const props = {
      ...baseProps,
      controlId: "custom-id",
    };
    const { component, rerender } = render(Agreement, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement();
    const checkbox = getAsHTMLElement(element, ".dusk-agreement__checkbox");
    const label = getAsHTMLElement(element, ".dusk-agreement__label");

    await rerender({
      checked: true,
      className: "baz",
      controlId: "new-custom-id",
      disabled: true,
      label: "new label",
      name: "new name",
    });

    expect(element).toHaveClass("dusk-agreement", "baz");
    expect(checkbox).toHaveAttribute("id", "new-custom-id");
    expect(checkbox).toHaveAttribute("name", "new name");
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
    expect(label).toHaveAttribute("for", "new-custom-id");
    expect(label).toHaveTextContent("new label");
  });

  it("should forward the `on:change` handler to the underlying element", async () => {
    const handleChange = vi.fn();
    const { component } = render(Agreement, baseOptions);
    const element = component.getRootElement();
    const checkbox = getAsHTMLElement(element, ".dusk-agreement__checkbox");

    component.$on("change", handleChange);

    await fireEvent.change(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
