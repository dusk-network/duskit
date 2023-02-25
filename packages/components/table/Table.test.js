import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Table from "./Table.svelte";
import InfiniteScroll from "./InfiniteScroll.svelte";
import { data } from "../../../storybook/stories/table/data";
import { writable } from "svelte/store";

vi.stubGlobal("scrollTo", vi.fn());

test("Table Component renders correctly with infinite scrolling", () => {
	const results = render(Table, {
		props: {
			data: data,
			duration: 1500,
			settings: {
				sortable: true,
				rowsPerPage: 10,
				infinite: true,
				limiter: true,
				filter: true,
			},
		},
	});

	expect(() => results.toHaveClass("duk-table"));
	expect(() => results.toHaveClass("duk-infinite-scroll"));
});

test("Infinite Scroll Component renders correctly with Loading Indicator", () => {
	const pageNumber = writable(1);
	const results = render(InfiniteScroll, {
		props: {
			items: data,
			itemsPerPage: 10,
			pageNumber: pageNumber,
			duration: 1000,
		},
	});
	expect(() => results.toHaveClass("duk-infinite-scroll"));
	expect(() => results.toHaveClass("duk-loading-indicator"));
});

vi.useFakeTimers();
test("Infinite Scroll Component renders correctly with Load More button", async () => {
	const pageNumber = writable(3);
	const results = render(InfiniteScroll, {
		props: {
			items: data,
			itemsPerPage: 10,
			pageNumber: pageNumber,
			duration: 1000,
		},
	});
	expect(() => results.toHaveClass("duk-infinite-scroll"));
	expect(() => results.toHaveClass("duk-button-wrapper"));

	let mockEvent = vi.fn();
	results.component.$on("infinite", function (event) {
		mockEvent(event);
		expect(event.type).toBe("infinite");
	});

	await fireEvent.click(results.container.querySelector(".duk-button"));
	expect(() => results.toHaveClass("duk-loading-indicator"));
	vi.runAllTimers();
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-table-snap.png")).toMatchImageSnapshot();
});
