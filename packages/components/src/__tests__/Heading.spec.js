import { renderWithSimpleContent } from "@duskit/test-helpers";
import { cleanup, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import { Heading } from "../..";

describe("Heading", () => {
  /** @type {import("svelte").ComponentProps<Heading<"h2">>} */
  const baseProps = {
    as: "h2",
    prominence: "standard",
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the `Heading` component with default optional properties", () => {
    const { component } = renderWithSimpleContent(Heading, baseOptions);
    const element = component.getRootElement().getRootElement();

    expect(element.nodeName.toLowerCase()).toBe("h2");
    expect(element).toHaveClass(
      "dusk-heading",
      "dusk-heading--prominence--standard",
      "dusk-heading--variant--plain"
    );
    expect(element).not.toHaveClass("dusk-heading--mono");
    expect(element).not.toHaveClass("dusk-heading--uppercase");
    expect(element.querySelectorAll(".dusk-heading__decoration").length).toBe(
      0
    );
  });

  it("should allow the user to pick the rendered element via the `as` property", () => {
    const props = { ...baseProps, as: "span" };
    const { component } = renderWithSimpleContent(Heading, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element.nodeName.toLowerCase()).toBe("span");
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      "data-testid": "heading-test",
      id: "some-id",
    };
    const { component } = render(Heading, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("foo", "bar");
    expect(element).toHaveAttribute("id", props.id);
    expect(element).toHaveAttribute("data-testid", props["data-testid"]);
  });

  it("should apply typography modifiers when `mono` and `uppercase` are `true`", () => {
    const props = { ...baseProps, mono: true, uppercase: true };
    const { component } = renderWithSimpleContent(Heading, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass(
      "dusk-heading--mono",
      "dusk-heading--uppercase"
    );
  });

  it("should apply text alignment class when `textAlign` is provided", () => {
    const props = { ...baseProps, textAlign: "center" };
    const { component } = renderWithSimpleContent(Heading, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass("dusk-heading--align--center");
  });

  it("should render decorations when a bracketed variant is selected", () => {
    const props = { ...baseProps, variant: "bracketed-primary" };
    const { component } = renderWithSimpleContent(Heading, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass("dusk-heading--variant--bracketed-primary");

    const decorations = element.querySelectorAll(".dusk-heading__decoration");
    expect(decorations.length).toBe(2);
    expect(decorations[0]).toHaveTextContent("[");
    expect(decorations[0]).toHaveAttribute("aria-hidden", "true");
    expect(decorations[1]).toHaveTextContent("]");
    expect(decorations[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("should react to property changes", async () => {
    const { component, rerender } = render(Heading, baseOptions);
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-heading--prominence--standard");
    expect(element).toHaveClass("dusk-heading--variant--plain");
    expect(element.querySelectorAll(".dusk-heading__decoration").length).toBe(
      0
    );

    await rerender({
      prominence: "hero",
      variant: "bracketed-neutral",
    });

    expect(element).toHaveClass("dusk-heading--prominence--hero");
    expect(element).toHaveClass("dusk-heading--variant--bracketed-neutral");
    expect(element.querySelectorAll(".dusk-heading__decoration").length).toBe(
      2
    );
  });

  it("should not introduce unwanted whitespace text nodes between slotted content and decorations", () => {
    /** @param {Element} node */
    const isDecorationNode = (node) =>
      node.nodeType === 1 &&
      node.classList.contains("dusk-heading__decoration");
    const props = {
      ...baseProps,
      variant: "bracketed-primary",
    };
    const { component } = renderWithSimpleContent(Heading, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    // filtering away comments added by Svelte
    const childNodes = Array.from(element.childNodes).filter(
      ({ nodeType }) => nodeType !== 8
    );
    const firstDecorationIdx = childNodes.findIndex(isDecorationNode);
    const lastDecorationIdx = childNodes.findLastIndex(isDecorationNode);
    const innerNodes = childNodes.slice(
      firstDecorationIdx + 1,
      lastDecorationIdx
    );
    const whitespaceNodes = innerNodes.filter(
      (node) => node.nodeType === 3 && node.textContent.trim() === ""
    );

    expect(whitespaceNodes.length).toBe(0);
  });
});
