import fs from "fs";
import { render } from "@testing-library/svelte";
import Menu from "./Menu.svelte";
import Item from "./Item.svelte";
import orientations from "@dusk-network/utilities/orientations.js";

test("Menu Component renders with correct styles and label", () => {
	let label = "Menu test label";
	const results = render(Menu, {
		props: {
			name: label,
			orientation: orientations.MENU.HORIZONTAL,
		},
	});
	expect(() => results.toHaveClass("duk-menu"));
	expect(() => results.toHaveClass("duk-menu--horizontal"));
	expect(results.container.querySelector(".duk-menu").getAttribute("aria-label")).toBe(label);
});

test("Menu Item Component renders with correct styles as span element", () => {
	const results = render(Item, {
		props: {
			active: true,
		},
	});
	expect(() => results.toHaveClass("duk-menu__item-wrapper"));
	expect(() => results.toHaveClass("duk-menu__item-wrapper--active"));

	expect(results.container.querySelector(".duk-menu__item-wrapper").tagName).toBe("SPAN");
});

test("Menu Item Component renders as anchor element", () => {
	const results = render(Item, {
		props: {
			href: "test link",
		},
	});
	expect(() => results.toHaveClass("duk-menu__item-wrapper"));
	expect(() => results.toHaveClass("duk-menu__item-wrapper--active"));

	expect(results.container.querySelector(".duk-menu__item-wrapper").tagName).toBe("A");
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-menu-snap.png")).toMatchImageSnapshot();
});
