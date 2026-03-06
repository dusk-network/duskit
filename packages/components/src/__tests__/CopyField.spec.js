import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import { getAsHTMLElement } from "@duskit/test-helpers";

import * as toastStore from "../toast/store";
import { CopyField } from "../..";

describe("CopyField", () => {
  const toastSpy = vi.spyOn(toastStore, "toast");

  let needsCleanup = false;

  if (!("clipboard" in navigator)) {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => {} },
    });

    needsCleanup = true;
  }

  const writeTextSpy = vi
    .spyOn(navigator.clipboard, "writeText")
    .mockResolvedValue(undefined);

  const baseProps = {
    displayValue: "1,234,567",
    name: "Sample Information",
    rawValue: "1234567",
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(() => {
    toastSpy.mockClear();
    writeTextSpy.mockClear();
    cleanup();
  });

  afterAll(() => {
    toastSpy.mockRestore();
    writeTextSpy.mockRestore();

    if (needsCleanup) {
      // @ts-expect-error in this case we made it configurable
      delete navigator.clipboard;
    }
  });

  it("should render the `CopyField` component", () => {
    const { container } = render(CopyField, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(CopyField, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-copy-field", "foo", "bar");
    expect(element).toHaveAttribute("id", props.id);
  });

  it("should be able to render the `CopyField` component with the copy button disabled", () => {
    const { component } = render(CopyField, {
      ...baseOptions,
      props: { ...baseProps, disabled: true },
    });
    const rootElement = component.getRootElement();
    const copyButton = getAsHTMLElement(
      rootElement,
      ".dusk-copy-field__button"
    );

    expect(rootElement).toHaveClass("dusk-copy-field--disabled");
    expect(copyButton).toBeDisabled();
  });

  it('should copy the raw value when the copy button is clicked and show a "toast" with a success message', async () => {
    const { component } = render(CopyField, baseOptions);
    const copyButton = getAsHTMLElement(
      component.getRootElement(),
      ".dusk-copy-field__button"
    );

    await fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      baseProps.rawValue
    );
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      "success",
      expect.stringContaining(baseProps.name),
      expect.any(String)
    );
  });

  it('should show a "toast" with an error message if the copy to clipboard fails', async () => {
    const errorMessage = "some error";

    writeTextSpy.mockRejectedValueOnce(new Error(errorMessage));

    const { component } = render(CopyField, baseOptions);
    const copyButton = getAsHTMLElement(
      component.getRootElement(),
      ".dusk-copy-field__button"
    );

    await fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      baseProps.rawValue
    );
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      "error",
      errorMessage,
      expect.any(String)
    );
  });

  it('should show a "toast" with an "not allowed" message if the copy to clipboard fails with a "NotAllowedError"', async () => {
    const error = new DOMException("some error message", "NotAllowedError");

    writeTextSpy.mockRejectedValueOnce(error);

    const { component } = render(CopyField, baseOptions);
    const copyButton = getAsHTMLElement(
      component.getRootElement(),
      ".dusk-copy-field__button"
    );

    await fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      baseProps.rawValue
    );
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      "error",
      "Clipboard access denied",
      expect.any(String)
    );
  });

  it("should react to prop changes", async () => {
    const props = {
      ...baseProps,
      disabled: false,
    };
    const { component, rerender } = render(CopyField, {
      ...baseOptions,
      props,
    });
    const element = component.getRootElement();
    const copyButton = getAsHTMLElement(element, ".dusk-copy-field__button");
    const textbox = /** @type {HTMLInputElement} */ (
      element.querySelector(".dusk-copy-field__content")
    );

    await rerender({
      className: "baz",
      disabled: true,
      displayValue: "5,678,900",
      name: "New data",
      rawValue: "5678900",
      tooltipId: "new-tooltip-id",
    });

    expect(element).toHaveClass("baz");
    expect(copyButton).toBeDisabled();
    expect(textbox.value).toBe("5,678,900");
    expect(copyButton).toHaveAttribute("data-tooltip-id", "new-tooltip-id");

    await fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("5678900");
    expect(toastSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith(
      "success",
      expect.stringContaining("New data"),
      expect.any(String)
    );
  });
});
