import { renderWithSimpleContent } from "@duskit/test-helpers";
import { cleanup, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import { Card } from "../..";

import CardFull from "./test-components/CardFull.svelte";

describe("Card", () => {
  const baseProps = {};
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the `Card` component in a `div` with the surface variant by default", () => {
    const { component } = renderWithSimpleContent(Card, baseOptions);
    const element = component.getRootElement().getRootElement();

    expect(element).toMatchSnapshot();
    expect(element.nodeName.toLowerCase()).toBe("div");
    expect(element).toHaveClass("dusk-card", "dusk-card--variant--surface");
    expect(element).not.toHaveClass("dusk-card--variant--layer");
  });

  it("should allow the user to pick the rendered element via the `as` property", () => {
    const props = { ...baseProps, as: "article" };
    const { component } = renderWithSimpleContent(Card, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element.nodeName.toLowerCase()).toBe("article");
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(Card, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass(
      "dusk-card",
      "dusk-card--variant--surface",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", props.id);
  });

  it("should apply the correct modifier class when the `variant` property is set to `layer`", () => {
    const props = { ...baseProps, variant: "layer" };
    const { component } = renderWithSimpleContent(Card, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass("dusk-card--variant--layer");
    expect(element).not.toHaveClass("dusk-card--variant--surface");
  });

  it("should not render any slot container if no slots are provided", () => {
    const { container } = render(Card, baseOptions);

    expect(container.querySelector(".dusk-card__header")).toBeNull();
    expect(container.querySelector(".dusk-card__body")).toBeNull();
    expect(container.querySelector(".dusk-card__footer")).toBeNull();
  });

  it("should render strictly the body container when only the default slot is provided", () => {
    const { container } = renderWithSimpleContent(Card, baseOptions);

    expect(container.querySelector(".dusk-card__header")).toBeNull();
    expect(container.querySelector(".dusk-card__body")).not.toBeNull();
    expect(container.querySelector(".dusk-card__footer")).toBeNull();
  });

  it("should render all slot containers when header, default, and footer slots are provided", () => {
    const { container } = render(CardFull, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
    expect(container.querySelector(".dusk-card__header")).not.toBeNull();
    expect(container.querySelector(".dusk-card__body")).not.toBeNull();
    expect(container.querySelector(".dusk-card__footer")).not.toBeNull();
  });
});
