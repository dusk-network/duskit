import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { Badge } from "../..";

describe("Badge", () => {
  const variants = /** @type {const} */ ([
    "error",
    "info",
    "neutral",
    "success",
    "warning",
  ]);
  const baseProps = {
    text: "Badge",
  };

  afterEach(cleanup);

  it('should render the Badge component using the "neutral" variant as a default', () => {
    const { container } = render(Badge, baseProps);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should be able to render the component without text", () => {
    const { component } = render(Badge, {});

    expect(component.getRootElement()).toHaveTextContent("");
  });

  it.each(variants)(
    'should be able to render the component using the "%s" variant',
    (variant) => {
      const { component } = render(Badge, { ...baseProps, variant });

      expect(component.getRootElement()).toHaveClass(
        `dusk-badge--variant--${variant}`
      );
    }
  );

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = { className: "foo bar", id: "some-id", text: "some text" };
    const { component } = render(Badge, props);
    const element = component.getRootElement();

    expect(element).toHaveClass(
      "dusk-badge",
      "dusk-badge--variant--neutral",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", "some-id");
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(Badge, baseProps);
    const element = component.getRootElement();

    await rerender({
      className: "baz",
      text: "modified text",
      variant: "error",
    });

    expect(element).toHaveClass("dusk-badge--variant--error", "baz");
    expect(element).toHaveTextContent("modified text");
  });
});
