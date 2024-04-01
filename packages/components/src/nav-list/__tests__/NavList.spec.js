import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import { NavList } from "..";

describe("NavList", () => {
  const baseProps = {
    navigation: [
      {
        link: "https://dusk.network",
        title: "Dusk",
      },
      {
        link: "https://explorer.dusk.network",
        title: "Explorer",
      },
    ],
  };

  afterEach(cleanup);

  it("renders the NavList component", () => {
    const { container } = render(NavList, baseProps);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render the Nav List with the correct information", () => {
    const { container } = render(NavList, baseProps);

    expect(
      container.getElementsByClassName("dusk-nav-list__link")[0].innerHTML
    ).toBe(baseProps.navigation[0].title);
    expect(
      container.getElementsByClassName("dusk-nav-list__link")[1].innerHTML
    ).toBe(baseProps.navigation[1].title);

    expect(
      container.getElementsByClassName("dusk-nav-list__link")[0]
    ).toHaveAttribute("href", baseProps.navigation[0].link);
    expect(
      container.getElementsByClassName("dusk-nav-list__link")[1]
    ).toHaveAttribute("href", baseProps.navigation[1].link);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
    };
    const { container } = render(NavList, props);

    expect(container.firstChild).toMatchSnapshot();
  });
});
