import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import {
  getAsHTMLElement,
  renderWithSimpleContent,
} from "@duskit/test-helpers";

import { Notification } from "../..";

/** @typedef {import("../dusk.components").StatusType} StatusType */

describe("Notification", () => {
  vi.useFakeTimers();

  /** @type {{ expectedRole: "alert" | "status" | null, mode: "panel" | "toast", type: StatusType }[]} */
  const baseCombinations = [
    { expectedRole: "alert", mode: "toast", type: "error" },
    { expectedRole: "status", mode: "toast", type: "info" },
    { expectedRole: "status", mode: "toast", type: "success" },
    { expectedRole: "alert", mode: "toast", type: "warning" },
    { expectedRole: null, mode: "panel", type: "error" },
    { expectedRole: null, mode: "panel", type: "info" },
    { expectedRole: null, mode: "panel", type: "success" },
    { expectedRole: null, mode: "panel", type: "warning" },
  ];

  const baseDate = new Date(2024, 4, 20, 15, 25, 30);

  /** @type {import("svelte").ComponentProps<Notification>} */
  const basePanelProps = {
    date: new Date(baseDate.getTime() - 10_000),
    dismissable: false,
    mode: "panel",
    read: true,
    type: "info",
  };

  /** @type {import("svelte").ComponentProps<Notification>} */
  const baseToastProps = {
    ...basePanelProps,
    decayProgress: 50,
    mode: "toast",
  };

  const baseOptions = {
    props: basePanelProps,
    target: document.body,
  };

  beforeEach(() => {
    vi.setSystemTime(baseDate);
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render the component correctly", async () => {
    const { component, getByLabelText, queryByLabelText, rerender } = render(
      Notification,
      baseOptions
    );
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-notification");
    expect(element).not.toHaveClass("dusk-notification--unread");
    expect(element).toBeInTheDocument();
    expect(queryByLabelText(/mark as read/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/dismiss/i)).not.toBeInTheDocument();

    await rerender({ dismissable: true, read: false });

    expect(getByLabelText(/mark as read/i)).toBeInTheDocument();
    expect(getByLabelText(/dismiss/i)).toBeInTheDocument();
    expect(element).toHaveClass(
      "dusk-notification",
      "dusk-notification--unread"
    );
  });

  it("should render the default slot content instead of the `text` property when provided", () => {
    const props = {
      ...basePanelProps,
      text: "This fallback text should be ignored",
    };

    // Using the utility to inject the default slot content
    const { container } = renderWithSimpleContent(Notification, {
      ...baseOptions,
      props,
    });

    // The utility injects "some text" inside a span. We verify it exists and the fallback is absent.
    expect(container.textContent).toContain("some text");
    expect(container.textContent).not.toContain(
      "This fallback text should be ignored"
    );
  });

  it("should pass additional class names and attributes to the root element", () => {
    const props = {
      ...basePanelProps,
      className: "custom-test-class",
      "data-testid": "notification-root",
    };
    const { component } = render(Notification, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-notification", "custom-test-class");
    expect(element).toHaveAttribute("data-testid", "notification-root");
  });

  it.each(baseCombinations)(
    "should apply correct CSS classes and accessibility role for mode $mode and type $type",
    ({ expectedRole, mode, type }) => {
      const props = {
        ...(mode === "panel" ? basePanelProps : baseToastProps),
        type,
      };
      const { component } = render(Notification, { ...baseOptions, props });
      const element = component.getRootElement();

      expect(element).toHaveClass(
        `dusk-notification--mode--${mode}`,
        `dusk-notification--type--${type}`
      );

      /* eslint-disable vitest/no-conditional-expect */

      if (expectedRole) {
        expect(element).toHaveAttribute("role", expectedRole);
      } else {
        expect(element).not.toHaveAttribute("role");
      }

      /* eslint-enable vitest/no-conditional-expect */

      expect.assertions(2);
    }
  );

  it("should render the mark as read button and dispatch the `markasread` event when clicked if `read` is `false`", async () => {
    const markAsReadHandler = vi.fn();
    const props = { ...basePanelProps, read: false };
    const { getByLabelText } = render(Notification, {
      ...baseOptions,
      events: { markasread: markAsReadHandler },
      props,
    });
    const brnMarkAsRead = getByLabelText(/mark as read/i);

    await fireEvent.click(brnMarkAsRead);

    expect(markAsReadHandler).toHaveBeenCalledOnce();
  });

  it("should render the dismiss button and dispatch the `dismiss` event when clicked if `dismissable` is `true`", async () => {
    const dismissHandler = vi.fn();
    const props = { ...basePanelProps, dismissable: true };
    const { getByLabelText } = render(Notification, {
      ...baseOptions,
      events: { dismiss: dismissHandler },
      props,
    });
    const btnDismiss = getByLabelText(/dismiss/i);

    await fireEvent.click(btnDismiss);

    expect(dismissHandler).toHaveBeenCalledOnce();
  });

  it("should accept a tooltip id that will be assigned to the relevant elements", async () => {
    const { getByLabelText, rerender } = render(Notification, {
      ...baseOptions,
      props: { ...basePanelProps, dismissable: true, read: false },
    });
    const btnDismissPanel = getByLabelText(/dismiss/i);
    const btnMarkAsReadPanel = getByLabelText(/mark as read/i);

    expect(btnDismissPanel).not.toHaveAttribute("data-tooltip-id");
    expect(btnMarkAsReadPanel).not.toHaveAttribute("data-tooltip-id");

    await rerender({ tooltipId: "my-tooltip" });

    expect(btnDismissPanel).toHaveAttribute("data-tooltip-id", "my-tooltip");
    expect(btnMarkAsReadPanel).toHaveAttribute("data-tooltip-id", "my-tooltip");
  });

  it("should apply a reduced tooltip delay only for toast notifications", async () => {
    // Toast mode: reduced delay for the dismiss tooltip
    const { getByLabelText, queryByLabelText, rerender } = render(
      Notification,
      {
        ...baseOptions,
        props: { ...baseToastProps, dismissable: true },
      }
    );
    const btnDismissToast = getByLabelText(/dismiss/i);

    expect(btnDismissToast).toHaveAttribute("data-tooltip-delay-show", "200");
    expect(queryByLabelText(/mark as read/i)).toBeNull();

    // Panel mode: neither button should have the reduced delay
    await rerender({ ...basePanelProps, dismissable: true, read: false });

    const btnDismissPanel = getByLabelText(/dismiss/i);
    const btnMarkAsReadPanel = getByLabelText(/mark as read/i);

    expect(btnDismissPanel).not.toHaveAttribute("data-tooltip-delay-show");
    expect(btnMarkAsReadPanel).not.toHaveAttribute("data-tooltip-delay-show");
  });

  it("should dispatch `mouseenter` and `mouseleave` events when interacting with the root element", async () => {
    const mouseEnterHandler = vi.fn();
    const mouseLeaveHandler = vi.fn();
    const { component } = render(Notification, {
      ...baseOptions,
      events: {
        mouseenter: mouseEnterHandler,
        mouseleave: mouseLeaveHandler,
      },
    });
    const element = component.getRootElement();

    await fireEvent.mouseEnter(element);

    expect(mouseEnterHandler).toHaveBeenCalledOnce();

    await fireEvent.mouseLeave(element);

    expect(mouseLeaveHandler).toHaveBeenCalledOnce();
  });

  it("should render custom text, title, and icon path when provided", () => {
    const props = {
      ...basePanelProps,
      iconPath: "M1 1h22v22H1z",
      text: "Custom body text",
      title: "Custom Title",
    };
    const { component } = render(Notification, { ...baseOptions, props });
    const element = component.getRootElement();
    const pathElement = element.querySelector("path");

    expect(element.textContent).toContain("Custom Title");
    expect(element.textContent).toContain("Custom body text");
    expect(pathElement).toHaveAttribute("d", props.iconPath);
  });

  it('should render the `ProgressBar` component and omit the date block when mode is "toast"', () => {
    const { container } = render(Notification, {
      ...baseOptions,
      props: baseToastProps,
    });
    const footer = getAsHTMLElement(container, ".dusk-notification__footer");

    expect(footer.querySelector("time")).toBeNull();
    expect(footer.querySelector(".dusk-progress-bar")).toBeInTheDocument();
  });

  it('should update the relative time automatically when mode is "panel" and the date is recent', async () => {
    const { container } = render(Notification, baseOptions);
    const footer = getAsHTMLElement(container, ".dusk-notification__footer");
    const timeElement = getAsHTMLElement(footer, "time");

    expect(timeElement.textContent).toMatchInlineSnapshot(`"10 seconds ago"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(timeElement.textContent).toMatchInlineSnapshot(`"11 seconds ago"`);
  });

  it('should render a static formatted string instead of `RelativeTime` when mode is "panel" and the date exceeds the recent threshold', async () => {
    // The threshold is 2 days. We subtract 3 days (in milliseconds) to trigger the static fallback.
    const oldDate = new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 3);
    const props = {
      ...basePanelProps,
      date: oldDate,
      locale: "en-US",
    };
    const { container, rerender } = render(Notification, {
      ...baseOptions,
      props,
    });
    const footer = getAsHTMLElement(container, ".dusk-notification__footer");
    const timeElement = getAsHTMLElement(footer, "time");

    expect(timeElement).not.toBeNull();

    // It must not be the dynamic RelativeTime component
    expect(timeElement).not.toHaveClass("dusk-relative-time");

    // Verify the static English formatting for May 17, 2024
    expect(timeElement.textContent).toMatchInlineSnapshot(`"May 17, 2024"`);

    await rerender({ locale: "it-IT" });

    expect(timeElement.textContent).toMatchInlineSnapshot(`"17 mag 2024"`);
  });
});
