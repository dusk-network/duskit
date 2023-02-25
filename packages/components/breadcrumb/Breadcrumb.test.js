import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Breadcrumb from "./Breadcrumb.svelte";
import Item from "./Item.svelte";

test("Breadcrumb Component renders correctly", async () => {
	const results = render(Breadcrumb, {
		props: {
			href: "test",
		},
	});
	expect(() => results.toHaveClass("duk-breadcrumb"));

	let mockEvent = vi.fn();
	results.component.$on("exit", function (event) {
		mockEvent(event.detail);
	});
	await fireEvent.click(results.container.querySelector(".duk-breadcrumb__item"));

	expect(results.container.querySelector(".duk-breadcrumb__item a").getAttribute("href")).toBe(
		"test",
	);
});

test("Breadcrumb Item Component renders correctly", () => {
	const results = render(Item, {
		props: {
			href: "test",
		},
	});
	expect(() => results.toHaveClass("duk-breadcrumb__item"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-breadcrumb-snap.png")).toMatchImageSnapshot();
});
