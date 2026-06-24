import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { everyIn } from "lamb";

import { ExclusiveChoice } from "../..";

/** @typedef {import("../dusk.components").OptionItem} OptionItem */

vi.mock("../__shared__/getDeterministicId", () => ({
  default: vi.fn().mockReturnValue("dusk-exclusive-choice-some-generated-id"),
}));

describe("ExclusiveChoice", () => {
  const stringOptions = ["one", "two", "three", "four"];

  /** @type {OptionItem[]} */
  const objectOptionsA = [
    { label: "one", value: "1" },
    { disabled: false, label: "two", value: "2" },
    { disabled: true, label: "three", value: "3" },
    { label: "four", value: "4" },
  ];

  /** @type {OptionItem[]} */
  const objectOptionsB = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
  ];

  const baseProps = {
    options: objectOptionsA,
    value: "2",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  afterAll(() => {
    vi.doUnmock("../__shared__/getDeterministicId");
  });

  it("should render the `ExclusiveChoice` component and assign a name to the radio inputs if it's not provided", () => {
    const { component } = render(ExclusiveChoice, baseOptions);
    const element = component.getRootElement();
    const radios = element.querySelectorAll("input[type='radio']");
    const labels = element.querySelectorAll("label");

    expect(baseProps.options.length).toBeGreaterThan(1);
    expect(radios.length).toBe(baseProps.options.length);
    expect(labels.length).toBe(baseProps.options.length);

    radios.forEach((radio, idx) => {
      expect(radio).toHaveAttribute(
        "name",
        "dusk-exclusive-choice-some-generated-id"
      );
      expect(radio).toHaveAttribute(
        "id",
        `dusk-exclusive-choice-some-generated-id-${baseProps.options[idx].value}`
      );
      expect(labels[idx]).toHaveAttribute("for", radio.getAttribute("id"));
    });

    expect(element).toMatchSnapshot();
    expect.assertions(radios.length * 3 + 4);
  });

  it("should accept a custom name for the radio elements", () => {
    const props = {
      ...baseProps,
      name: "my-custom-name",
    };
    const { component } = render(ExclusiveChoice, { ...baseOptions, props });
    const element = component.getRootElement();
    const radios = element.querySelectorAll("input[type='radio']");
    const labels = element.querySelectorAll("label");

    expect(baseProps.options.length).toBeGreaterThan(1);
    expect(radios.length).toBe(baseProps.options.length);
    expect(labels.length).toBe(baseProps.options.length);

    radios.forEach((radio, idx) => {
      expect(radio).toHaveAttribute("name", props.name);
      expect(radio).toHaveAttribute(
        "id",
        `dusk-exclusive-choice-some-generated-id-${baseProps.options[idx].value}`
      );
      expect(labels[idx]).toHaveAttribute("for", radio.getAttribute("id"));
    });
  });

  it("should accept an array of options object without labels and use the value as labels", () => {
    const props = {
      ...baseProps,
      options: objectOptionsB,
    };
    const { component } = render(ExclusiveChoice, { ...baseOptions, props });
    const labels = component.getRootElement().querySelectorAll("label");

    expect(objectOptionsB.length).toBeGreaterThan(1);
    expect(labels.length).toBe(objectOptionsB.length);
    expect(
      everyIn(
        labels,
        (label, idx) => label.textContent === objectOptionsB[idx].value
      )
    ).toBe(true);
  });

  it("should accept an array of string as options", () => {
    const props = {
      ...baseProps,
      options: stringOptions,
    };
    const { component } = render(ExclusiveChoice, { ...baseOptions, props });
    const element = component.getRootElement();
    const radios = element.querySelectorAll("input[type='radio']");
    const labels = element.querySelectorAll("label");

    expect(stringOptions.length).toBeGreaterThan(1);

    radios.forEach((radio, idx) => {
      expect(radio).toHaveAttribute("value", stringOptions[idx]);
      expect(labels[idx]).toHaveTextContent(stringOptions[idx]);
    });

    expect.assertions(stringOptions.length * 2 + 1);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(ExclusiveChoice, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-exclusive-choice", "foo", "bar");
    expect(element).toHaveAttribute("id", props.id);
  });

  it("should forward the change event to the radio elements", async () => {
    const changeHandler = vi.fn();
    const { container } = render(ExclusiveChoice, {
      ...baseOptions,
      events: { change: changeHandler },
    });
    const target = /** @type {HTMLInputElement} */ (
      container.querySelector("input[value='4']")
    );

    await fireEvent.click(target);

    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith(expect.any(Event));
    expect(target).toBeChecked();
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(ExclusiveChoice, baseOptions);
    const element = component.getRootElement();

    await rerender({
      className: "baz",
      name: "some-new-name",
      options: objectOptionsB,
      value: "3",
    });

    let radios = element.querySelectorAll("input[type='radio']");
    let labels = element.querySelectorAll("label");

    expect(element).toHaveClass("baz");
    expect(objectOptionsB.length).toBeGreaterThan(1);
    expect(radios.length).toBe(objectOptionsB.length);
    expect(labels.length).toBe(objectOptionsB.length);

    radios.forEach((radio, idx) => {
      expect(radio).toHaveAttribute("name", "some-new-name");
      expect(radio).toHaveAttribute(
        "id",
        `dusk-exclusive-choice-some-generated-id-${objectOptionsB[idx].value}`
      );
      expect(labels[idx]).toHaveAttribute("for", radio.getAttribute("id"));
    });

    expect(
      element.querySelector("input[type='radio'][value='3']")
    ).toBeChecked();

    await rerender({
      options: stringOptions,
      value: stringOptions[1],
    });

    radios = element.querySelectorAll("input[type='radio']");
    labels = element.querySelectorAll("label");

    expect(stringOptions.length).toBeGreaterThan(1);
    expect(radios.length).toBe(stringOptions.length);
    expect(labels.length).toBe(stringOptions.length);

    radios.forEach((radio, idx) => {
      expect(radio).toHaveAttribute("name", "some-new-name");
      expect(radio).toHaveAttribute(
        "id",
        `dusk-exclusive-choice-some-generated-id-${stringOptions[idx]}`
      );
      expect(labels[idx]).toHaveAttribute("for", radio.getAttribute("id"));
    });

    expect(
      element.querySelector(`input[type='radio'][value='${stringOptions[1]}']`)
    ).toBeChecked();

    expect.assertions(radios.length * 3 * 2 + 9);
  });
});
