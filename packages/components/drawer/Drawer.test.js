import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Drawer from "./Drawer.svelte";

test("Drawer Component renders correctly", async () => {
	document.offsetWidth = vi.fn();
	const results = render(Drawer, {
		props: {
			items: [
				{
					id: 1,
					icon: "contract",
					text: "test",
					path: "/",
					disabled: false,
				},
			],
			activePath: "/",
			breakpoint: "sm",
		},
	});
	expect(() => results.toHaveClass("duk-drawer"));
	expect(() => results.toHaveClass("duk-drawer--sm"));

	let listItems = results.container.querySelectorAll(".duk-drawer__item");

	expect(() => listItems[0].toHaveClass("duk-drawer__item--active"));
	expect(() => listItems[0].toHaveClass("duk-drawer__item--collapsed"));

	let toggle = results.container.querySelector(".duk-drawer__item--toggle");

	//Check if Drawer has opened
	await fireEvent.click(toggle);
	expect(listItems[0].classList.contains("duk-drawer__item--collapsed")).toBe(false);

	//Check if Drawer has closed
	await fireEvent.click(toggle);
	expect(() => listItems[0].toHaveClass("duk-drawer__item--collapsed"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-drawer-snap.png")).toMatchImageSnapshot();
});
