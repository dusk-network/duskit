import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { ErrorAlert } from "../..";

describe("ErrorAlert", () => {
  const gaps = /** @type {const} */ (["default", "large", "medium", "small"]);
  const baseProps = {
    error: new Error("some error message"),
    summary: "Some error summary",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the `ErrorAlert` component", () => {
    const { container } = render(ErrorAlert, baseOptions);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(ErrorAlert, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass(
      "dusk-error-alert",
      "dusk-error-alert--default-gap",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", props.id);
  });

  it.each(gaps)(
    'should render the component applying the desired "%s" gap',
    (gap) => {
      const props = { ...baseProps, gap };
      const { component } = render(ErrorAlert, {
        ...baseOptions,
        props,
      });
      const element = component.getRootElement();

      expect(element).toHaveClass(`dusk-error-alert--${gap}-gap`);
    }
  );

  it("should react to prop changes", async () => {
    const { component, rerender } = render(ErrorAlert, baseOptions);
    const element = component.getRootElement();

    await rerender({
      className: "baz",
      error: new Error("some new error"),
      gap: gaps[1],
      summary: "new error summary",
    });

    expect(element).toHaveClass("baz", `dusk-error-alert--${gaps[1]}-gap`);
    expect(
      element.querySelector(".dusk-error-details__summary")
    ).toHaveTextContent("new error summary");
    expect(
      element.querySelector(".dusk-error-details__error")
    ).toHaveTextContent("some new error");
  });
});
