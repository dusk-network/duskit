import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { mdiAccount, mdiHome } from "@mdi/js";
import { getAsHTMLElement } from "@duskit/test-helpers";

import { ContentSwitch } from "../..";

/** @typedef {import("svelte").ComponentProps<ContentSwitch>} ContentSwitchProps */

describe("ContentSwitch", () => {
  /** @type {ContentSwitchProps["items"]} */
  const items = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    {
      icon: { path: mdiHome, position: "before" },
      id: "icon-before",
      label: "Icon before",
    },
    {
      icon: { path: mdiAccount, position: "after" },
      id: "icon-after",
      label: "Icon after",
    },
    { icon: { path: mdiHome }, id: "icon-only" },
    { id: "id-only" },
  ];

  /** @type {ContentSwitchProps} */
  const baseProps = {
    items,
    selectedTab: "overview",
  };

  const baseOptions = {
    props: baseProps,
  };

  const focusSpy = vi.spyOn(HTMLLIElement.prototype, "focus");

  afterEach(() => {
    cleanup();
    focusSpy.mockClear();
  });

  afterAll(() => {
    focusSpy.mockRestore();
  });

  it("should render the `ContentSwitch` component", () => {
    const { container } = render(ContentSwitch, baseOptions);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should have the correct roles for accessibility", () => {
    const { component } = render(ContentSwitch, baseOptions);
    const element = component.getRootElement();

    expect(element).toHaveRole("tablist");
    expect(element.querySelectorAll('[role="tab"]')).toHaveLength(items.length);
  });

  it("should pass additional class names and attributes to the root `ul` element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "my-content-switch",
    };
    const { component } = render(ContentSwitch, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-content-switch", "foo", "bar");
    expect(element).toHaveAttribute("id", props.id);
  });

  it("should expose the selection through aria-selected", () => {
    const { getByRole } = render(ContentSwitch, baseOptions);
    const selected = getByRole("tab", { name: "Overview" });
    const notSelected = getByRole("tab", { name: "Details" });

    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(notSelected).toHaveAttribute("aria-selected", "false");
  });

  it("should render an empty list without errors if `items` is an empty array", () => {
    const { component } = render(ContentSwitch, {
      props: {
        items: [],
      },
    });
    const element = component.getRootElement();

    expect(element).toBeInTheDocument();
    expect(element).toHaveRole("tablist");
    expect(element.querySelectorAll('[role="tab"]')).toHaveLength(0);
  });

  it("should set the `tabindex` to zero on the first item as a fallback if `selectedTab` is a non-existent ID", () => {
    const { getAllByRole } = render(ContentSwitch, {
      props: {
        ...baseProps,
        selectedTab: "non-existent-id",
      },
    });
    const tabs = getAllByRole("tab");
    const tabIndices = tabs.map((tab) => tab.getAttribute("tabindex"));

    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute("aria-selected", "false");
      expect(tab).not.toHaveClass("dusk-content-switch__tab-item--expanded");
    });
    expect(tabIndices).toStrictEqual(["0", "-1", "-1", "-1", "-1", "-1"]);
    expect.assertions(items.length * 2 + 1);
  });

  it("should set `tabindex` to zero on the first item as a fallback if `selectedTab` is `undefined`", () => {
    const { getAllByRole } = render(ContentSwitch, {
      props: {
        items,
        selectedTab: undefined,
      },
    });
    const tabs = getAllByRole("tab");
    const tabIndices = tabs.map((tab) => tab.getAttribute("tabindex"));

    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute("aria-selected", "false");
      expect(tab).not.toHaveClass("dusk-content-switch__tab-item--expanded");
    });
    expect(tabIndices).toStrictEqual(["0", "-1", "-1", "-1", "-1", "-1"]);
    expect.assertions(items.length * 2 + 1);
  });

  describe("Rendering icons and labels", () => {
    it("should render a tab with label only", () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tab = getByRole("tab", { name: "Overview" });

      expect(
        tab.querySelector(".dusk-content-switch__tab-label")
      ).toHaveTextContent("Overview");
      expect(tab.querySelector(".dusk-icon")).toBeNull();
    });

    it("should use the `id` as a fallback if the label is missing", () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tab = getByRole("tab", { name: "id-only" });

      expect(
        tab.querySelector(".dusk-content-switch__tab-label")
      ).toHaveTextContent("id-only");
      expect(tab.querySelector(".dusk-icon")).toBeNull();
    });

    it("should render a tab with icon only and no label", () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tab = getByRole("tab", {
        name: (content, el) => el.getAttribute("data-tabid") === "icon-only",
      });

      expect(tab.querySelector(".dusk-content-switch__tab-label")).toBeNull();
      expect(tab.querySelector(".dusk-icon")).toBeInTheDocument();
      expect(tab.querySelector(".dusk-icon path")).toHaveAttribute(
        "d",
        mdiHome
      );
    });

    it('should render a tab with an icon in "before" position', () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tab = getByRole("tab", { name: "Icon before" });
      const svgElement = /** @type {SVGSVGElement} */ (
        tab.querySelector(".dusk-icon")
      );
      const spanElement = getAsHTMLElement(
        tab,
        ".dusk-content-switch__tab-label"
      );
      const iconPosition = spanElement.compareDocumentPosition(svgElement);

      expect(spanElement).toHaveTextContent("Icon before");
      expect(svgElement).toBeInTheDocument();
      expect(iconPosition & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
    });

    it('should render a tab with an icon in "after" position', () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tab = getByRole("tab", { name: "Icon after" });
      const svgElement = /** @type {SVGSVGElement} */ (
        tab.querySelector("svg")
      );
      const spanElement = getAsHTMLElement(
        tab,
        ".dusk-content-switch__tab-label"
      );
      const iconPosition = spanElement.compareDocumentPosition(svgElement);

      expect(spanElement).toHaveTextContent("Icon after");
      expect(svgElement).toBeInTheDocument();
      expect(iconPosition & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  describe("Event Handling", () => {
    it("should fire a `change` event when a non selected tab is clicked", async () => {
      const handleChange = vi.fn();
      const { getByRole } = render(ContentSwitch, {
        ...baseOptions,
        events: { change: handleChange },
      });
      const tabDetails = getByRole("tab", { name: "Details" });

      await fireEvent.click(tabDetails);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ detail: "details" })
      );
    });

    it("should not fire a `change` event when the already selected tab is clicked", async () => {
      const handleChange = vi.fn();
      const { getByRole } = render(ContentSwitch, {
        ...baseOptions,
        events: { change: handleChange },
      });
      const tabOverview = getByRole("tab", { name: "Overview" });

      await fireEvent.click(tabOverview);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it.each([{ key: "Enter" }, { key: " " }])(
      "should fire a `change` event when $key is pressed on a focused tab",
      async ({ key }) => {
        const handleChange = vi.fn();
        const { getByRole } = render(ContentSwitch, {
          ...baseOptions,
          events: { change: handleChange },
        });
        const tabDetails = getByRole("tab", { name: "Details" });

        await fireEvent.keyDown(tabDetails, { key });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ detail: "details" })
        );
      }
    );
  });

  describe("Accessibility (roving tabindex and keyboard navigation)", () => {
    it("should only have one tab with `tabindex` set to zero (the selected one) on init", () => {
      const { getAllByRole } = render(ContentSwitch, baseOptions);
      const tabs = getAllByRole("tab");
      const tabIndices = tabs.map((tab) => tab.getAttribute("tabindex"));

      expect(tabIndices).toStrictEqual(["0", "-1", "-1", "-1", "-1", "-1"]);
    });

    it("should move the focus and the `tabindex`, but not the selection, when the right arrow key is pressed, wrapping to start", async () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });
      const lastTab = getByRole("tab", { name: "id-only" });

      tabOverview.focus();
      focusSpy.mockClear();

      expect(document.activeElement).toBe(tabOverview);

      // Overview -> Details
      await fireEvent.keyDown(tabOverview, { key: "ArrowRight" });

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(tabDetails);
      expect(tabOverview).toHaveAttribute("tabindex", "-1");
      expect(tabDetails).toHaveAttribute("tabindex", "0");

      // Selection hasn't changed
      expect(tabOverview).toHaveAttribute("aria-selected", "true");
      expect(tabDetails).toHaveAttribute("aria-selected", "false");

      lastTab.focus();
      focusSpy.mockClear();

      // Wrap-around from last to first
      await fireEvent.keyDown(lastTab, { key: "ArrowRight" });

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(tabOverview);
      expect(lastTab).toHaveAttribute("tabindex", "-1");
      expect(tabOverview).toHaveAttribute("tabindex", "0");

      // Selection hasn't changed
      expect(tabOverview).toHaveAttribute("aria-selected", "true");
      expect(tabDetails).toHaveAttribute("aria-selected", "false");
      expect(lastTab).toHaveAttribute("aria-selected", "false");
    });

    it("should move the focus and the `tabindex`, but not the selection, when the left arrow key is pressed, wrapping to end", async () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });
      const lastTab = getByRole("tab", { name: "id-only" });

      tabDetails.focus();
      focusSpy.mockClear();

      // Details -> Overview
      await fireEvent.keyDown(tabDetails, { key: "ArrowLeft" });

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(tabOverview);
      expect(tabDetails).toHaveAttribute("tabindex", "-1");
      expect(tabOverview).toHaveAttribute("tabindex", "0");

      // Selection hasn't changed
      expect(tabOverview).toHaveAttribute("aria-selected", "true");
      expect(tabDetails).toHaveAttribute("aria-selected", "false");

      // Wrap-around from first to last
      await fireEvent.keyDown(tabOverview, { key: "ArrowLeft" });

      expect(focusSpy).toHaveBeenCalledTimes(2);
      expect(document.activeElement).toBe(lastTab);
      expect(tabOverview).toHaveAttribute("tabindex", "-1");
      expect(lastTab).toHaveAttribute("tabindex", "0");

      // Selection hasn't changed
      expect(tabOverview).toHaveAttribute("aria-selected", "true");
      expect(tabDetails).toHaveAttribute("aria-selected", "false");
      expect(lastTab).toHaveAttribute("aria-selected", "false");
    });

    it('should move the focus and the `tabindex` to the first tab when the "Home" key is pressed', async () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });

      tabDetails.focus();
      focusSpy.mockClear();

      await fireEvent.keyDown(tabDetails, { key: "Home" });

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(tabOverview);
      expect(tabDetails).toHaveAttribute("tabindex", "-1");
      expect(tabOverview).toHaveAttribute("tabindex", "0");
    });

    it('should move the focus and the `tabindex` to the last tab when the "End" key is pressed', async () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const lastTab = getByRole("tab", { name: "id-only" });

      tabOverview.focus();
      focusSpy.mockClear();

      await fireEvent.keyDown(tabOverview, { key: "End" });

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(lastTab);
      expect(tabOverview).toHaveAttribute("tabindex", "-1");
      expect(lastTab).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Expanded Effect", () => {
    it('should add the "expanded" class on `mouseover` and remove it on `mouseout`', async () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });

      // The selectd tab is the one expanded by default
      expect(tabOverview).toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
      expect(tabDetails).not.toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );

      await fireEvent.mouseOver(tabDetails);

      expect(tabOverview).not.toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
      expect(tabDetails).toHaveClass("dusk-content-switch__tab-item--expanded");

      await fireEvent.mouseOut(tabDetails);

      expect(tabOverview).toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
      expect(tabDetails).not.toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
    });

    it('should add the "expanded" class on `focus` and remove it on `blur`', async () => {
      const { getByRole } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });

      await fireEvent.focus(tabDetails);

      expect(tabOverview).not.toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
      expect(tabDetails).toHaveClass("dusk-content-switch__tab-item--expanded");

      await fireEvent.blur(tabDetails);

      expect(tabOverview).toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
      expect(tabDetails).not.toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
    });
  });

  describe("Reactivity", () => {
    it("should react to external 'selectedTab' prop changes", async () => {
      const { getByRole, rerender } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });

      // Initial state
      expect(tabOverview).toHaveAttribute("aria-selected", "true");
      expect(tabOverview).toHaveAttribute("tabindex", "0");
      expect(tabOverview).toHaveClass(
        "dusk-content-switch__tab-item--expanded"
      );
      expect(tabDetails).toHaveAttribute("aria-selected", "false");
      expect(tabDetails).toHaveAttribute("tabindex", "-1");

      await rerender({ selectedTab: "details" });

      // the selected tab is updated
      expect(tabOverview).toHaveAttribute("aria-selected", "false");
      expect(tabDetails).toHaveAttribute("aria-selected", "true");

      // The roving `tabindex` and the "expanded" class are updated
      expect(tabOverview).toHaveAttribute("tabindex", "-1");
      expect(tabDetails).toHaveAttribute("tabindex", "0");
      expect(tabDetails).toHaveClass("dusk-content-switch__tab-item--expanded");
    });

    it("should correctly sync internal state after an external prop change", async () => {
      const { getByRole, rerender } = render(ContentSwitch, baseOptions);
      const tabOverview = getByRole("tab", { name: "Overview" });
      const tabDetails = getByRole("tab", { name: "Details" });
      const tabIconBefore = getByRole("tab", { name: "Icon before" });

      // Overview -> Details
      await fireEvent.keyDown(tabOverview, { key: "ArrowRight" });

      expect(document.activeElement).toBe(tabDetails);
      expect(tabDetails).toHaveAttribute("tabindex", "0");
      expect(tabOverview).toHaveAttribute("aria-selected", "true");

      // External prop change
      await rerender({ selectedTab: "icon-before" });

      expect(tabIconBefore).toHaveAttribute("aria-selected", "true");
      expect(tabIconBefore).toHaveAttribute("tabindex", "0");
      expect(tabDetails).toHaveAttribute("tabindex", "-1");
    });

    it.each([
      {
        caseName: "a non-existent ID",
        propValue: "non-existent-id",
      },
      {
        caseName: "undefined",
        propValue: undefined,
      },
    ])(
      "should set the `tabindex` to zero on the first item as a fallback if `selectedTab` is $caseName",
      async ({ propValue }) => {
        const { getAllByRole, getByRole, rerender } = render(
          ContentSwitch,
          baseOptions
        );
        const tabOverview = getByRole("tab", { name: "Overview" });

        expect(tabOverview).toHaveAttribute("aria-selected", "true");
        expect(tabOverview).toHaveAttribute("tabindex", "0");
        expect(tabOverview).toHaveClass(
          "dusk-content-switch__tab-item--expanded"
        );

        // Re-render with `undefined` or invalid prop
        await rerender({ selectedTab: propValue });

        const tabs = getAllByRole("tab");
        const tabIndices = tabs.map((tab) => tab.getAttribute("tabindex"));

        tabs.forEach((tab) => {
          expect(tab).toHaveAttribute("aria-selected", "false");
          expect(tab).not.toHaveClass(
            "dusk-content-switch__tab-item--expanded"
          );
        });
        expect(tabIndices).toStrictEqual(["0", "-1", "-1", "-1", "-1", "-1"]);
        expect.assertions(items.length * 2 + 4);
      }
    );
  });
});
