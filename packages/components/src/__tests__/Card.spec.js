import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { renderWithSimpleContent } from "@duskit/test-helpers";

import { Card } from "../..";

describe("Card", () => {
  const gaps = /** @type {const} */ (["default", "large", "medium", "small"]);

  const baseProps = {};
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the `Card` component in a `div` with a standard gap by default", () => {
    const { component } = renderWithSimpleContent(Card, baseOptions);
    const element = component.getRootElement().getRootElement();

    expect(element.nodeName.toLowerCase()).toBe("div");
    expect(element).toHaveClass("dusk-card", "dusk-card--gap-default");
    expect(element).toMatchSnapshot();
  });

  it("should allow the user to pick the rendered element via the `as` property", () => {
    const props = { ...baseProps, as: "header" };
    const { component } = renderWithSimpleContent(Card, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement().getRootElement();

    expect(element.nodeName.toLowerCase()).toBe("header");
  });

  it("should update a specific class when its `onSurface` property changes", async () => {
    /**
     * `rerender` returned by `renderWithSimpleContent` doesn't
     * trigger a rerender of the underlying component.
     */
    const { component, rerender } = render(Card, baseOptions);
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-card--off-surface");
    expect(element).not.toHaveClass("dusk-card--on-surface");

    await rerender({ onSurface: true });

    expect(element).toHaveClass("dusk-card--on-surface");
    expect(element).not.toHaveClass("dusk-card--off-surface");
  });

  it.each(gaps)(
    'should render the component applying the desired "%s" gap',
    (gap) => {
      const props = { ...baseProps, gap };
      const { component } = renderWithSimpleContent(Card, {
        ...baseOptions,
        props,
      });
      const element = component.getRootElement().getRootElement();

      expect(element).toHaveClass("dusk-card", `dusk-card--gap-${gap}`);
    }
  );

  it("should hide the card body if the `showBody` property changes to `false`", async () => {
    /**
     * `rerender` returned by `renderWithSimpleContent` doesn't
     * trigger a rerender of the underlying component.
     */
    const { container, rerender } = render(Card, baseOptions);

    expect(container.querySelector(".dusk-card__body-container")).toBeDefined();

    await rerender({ showBody: false });

    expect(container.querySelector(".dusk-card__body-container")).toBeNull();
  });
});
