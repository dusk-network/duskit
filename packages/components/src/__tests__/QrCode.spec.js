import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import { always, mapValues } from "lamb";

import { getAsHTMLElement } from "@duskit/test-helpers";

import { QrCode } from "../..";

const toDataURLMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue("fake-data-url")
);

vi.mock("qrcode", () => ({
  toDataURL: toDataURLMock,
}));

describe("QrCode", () => {
  vi.useFakeTimers();

  const gaps = /** @type {const} */ (["default", "large", "medium", "small"]);
  const defaultQROptions = {
    color: {
      dark: "#101",
      light: "#fff",
    },
    width: 200,
  };

  const baseProps = {
    altText: "some alt text",
    bgColor: "#eee",
    qrColor: "#8f0000",
    size: 500,
    value: "some text",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(async () => {
    await vi.runAllTimersAsync();
    cleanup();
    toDataURLMock.mockClear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render the `QrCode` component and update it when any of the QR code related props change", async () => {
    const { component, rerender } = render(QrCode, baseOptions);
    const element = component.getRootElement().getRootElement();

    // Loading state
    expect(element).toMatchSnapshot();
    expect(element).toHaveClass("dusk-qr-code", "dusk-suspense--default-gap");
    expect(element.querySelector("dusk-throbber")).toBeDefined();

    await vi.runAllTimersAsync();

    const img = element.querySelector(".dusk-qr-code__image");

    let expectedQrOptions = {
      color: {
        dark: "#8f0000",
        light: "#eee",
      },
      width: 500,
    };

    expect(toDataURLMock).toHaveBeenCalledTimes(1);
    expect(toDataURLMock).toHaveBeenCalledWith(
      baseProps.value,
      expectedQrOptions
    );
    expect(element).toMatchSnapshot();
    expect(element.querySelector("dusk-throbber")).toBeNull();
    expect(img).toHaveAttribute("alt", "some alt text");
    expect(img).toHaveAttribute("src", "fake-data-url");
    expect(img).toHaveAttribute("height", "500");
    expect(img).toHaveAttribute("width", "500");

    const newProps = {
      altText: undefined,
      bgColor: "#f00",
      className: "new-class",
      qrColor: "#00f",
      size: 300,
      value: "new-value",
    };

    expectedQrOptions = {
      color: {
        dark: "#00f",
        light: "#f00",
      },
      width: 300,
    };

    toDataURLMock.mockResolvedValueOnce(newProps.value);

    await rerender(newProps);
    await vi.runAllTimersAsync();

    expect(element).toHaveClass("new-class");
    expect(toDataURLMock).toHaveBeenCalledTimes(2);
    expect(toDataURLMock).toHaveBeenCalledWith(
      newProps.value,
      expectedQrOptions
    );

    const newImg = element.querySelector(".dusk-qr-code__image");

    expect(newImg).toHaveAttribute("alt", "QR Code");
    expect(newImg).toHaveAttribute("src", newProps.value);
    expect(newImg).toHaveAttribute("height", "300");
    expect(newImg).toHaveAttribute("width", "300");

    // Absence of image's `src` attribute
    toDataURLMock.mockResolvedValueOnce("");

    await rerender({ value: "" });
    await vi.runAllTimersAsync();

    expect(element.querySelector(".dusk-qr-code__image")).not.toHaveAttribute(
      "src"
    );
  });

  it("should use default values for QR code related props", async () => {
    const { component, rerender } = render(QrCode, {
      ...baseOptions,
      props: {},
    });
    const element = component.getRootElement().getRootElement();

    await vi.runAllTimersAsync();

    const img = element.querySelector(".dusk-qr-code__image");

    expect(toDataURLMock).toHaveBeenCalledTimes(1);
    expect(toDataURLMock).toHaveBeenCalledWith("", defaultQROptions);
    expect(img).toHaveAttribute("alt", "QR Code");
    expect(img).toHaveAttribute("src", "fake-data-url");
    expect(img).toHaveAttribute("height", "200");
    expect(img).toHaveAttribute("width", "200");

    // Switch from all props set to all `undefined`s
    await rerender(baseProps);
    await vi.runAllTimersAsync();
    await rerender(mapValues(baseProps, always(undefined)));
    await vi.runAllTimersAsync();

    const updatedImg = element.querySelector(".dusk-qr-code__image");

    expect(toDataURLMock).toHaveBeenCalledTimes(3);
    expect(toDataURLMock).toHaveBeenCalledWith("", defaultQROptions);
    expect(updatedImg).toHaveAttribute("alt", "QR Code");
    expect(updatedImg).toHaveAttribute("src", "fake-data-url");
    expect(updatedImg).toHaveAttribute("height", "200");
    expect(updatedImg).toHaveAttribute("width", "200");
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      "data-baz": "baz",
    };
    const { component } = render(QrCode, { ...baseOptions, props });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass("dusk-qr-code", "foo", "bar");
    expect(element).toHaveAttribute("data-baz", "baz");
  });

  describe("`Suspense` props", () => {
    it.each(gaps)(
      "should pass the `gap` prop to the underlying `Suspense`",
      (gap) => {
        const props = { ...baseProps, gap };
        const { component } = render(QrCode, {
          ...baseOptions,
          props,
        });
        const element = component.getRootElement().getRootElement();

        expect(element).toHaveClass(
          "dusk-suspense",
          `dusk-suspense--${gap}-gap`,
          "dusk-qr-code"
        );
      }
    );

    it("should pass the `pendingMessage` prop to the underlying `Suspense`", () => {
      const props = { ...baseProps, pendingMessage: "creating QR code" };
      const { component } = render(QrCode, {
        ...baseOptions,
        props,
      });
      const element = component.getRootElement().getRootElement();

      expect(
        element.querySelector(".dusk-suspense__pending-message")
      ).toHaveTextContent(props.pendingMessage);
    });
  });

  it("should dispatch an `error` event and show the `Suspense`'s error when the QR code creation fails", async () => {
    toDataURLMock.mockRejectedValueOnce("some error message");

    const dispatchMock = vi.fn();
    const createDispatcherSpy = vi
      .spyOn(await import("svelte"), "createEventDispatcher")
      .mockImplementation(() => dispatchMock);

    const { component } = render(QrCode, baseOptions);
    const element = component.getRootElement().getRootElement();

    await vi.runAllTimersAsync();

    const banner = getAsHTMLElement(element, ".dusk-banner");

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith("error", "some error message");
    expect(banner).toHaveClass("dusk-banner--error");
    expect(
      getAsHTMLElement(banner, ".dusk-error-details__summary")
    ).toHaveTextContent("Unable to generate QR code");
    expect(
      getAsHTMLElement(banner, ".dusk-error-details__error")
    ).toHaveTextContent("some error message");

    createDispatcherSpy.mockRestore();
  });
});
