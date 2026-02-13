import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { ErrorDetails } from "../..";

describe("ErrorDetails", () => {
  const baseProps = {
    error: new Error("Some error messaage"),
    summary: "Some error summary",
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the `ErrorDetails` component", () => {
    const { container } = render(ErrorDetails, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should pass additional class names to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(ErrorDetails, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-error-details", "foo", "bar");
    expect(element).toHaveAttribute("id", props.id);
  });

  it("should render nothing if the error is `null`", () => {
    const props = {
      ...baseProps,
      error: null,
    };
    const { container, component } = render(ErrorDetails, {
      ...baseOptions,
      props,
    });

    expect(component.getRootElement()).toBeNull();
    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(ErrorDetails, baseOptions);
    const element = component.getRootElement();

    await rerender({
      className: "baz",
      error: new Error("some new error"),
      summary: "new error summary",
    });

    expect(element).toHaveClass("baz");
    expect(
      element?.querySelector(".dusk-error-details__summary")
    ).toHaveTextContent("new error summary");
    expect(
      element?.querySelector(".dusk-error-details__error")
    ).toHaveTextContent("some new error");
  });
});
