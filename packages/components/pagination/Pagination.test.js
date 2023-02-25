import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Pagination from "./Pagination.svelte";
import { data } from "../../../storybook/stories/table/data";
import { writable } from "svelte/store";

const pageNumber = writable(1);

test("Pagination Component renders correctly", async () => {
	const results = render(Pagination, {
		props: {
			items: data,
			itemsPerPage: 10,
			pageNumber: pageNumber,
		},
	});
	let prev = results.container.querySelector(".duk-pagination__button--prev");
	let next = results.container.querySelector(".duk-pagination__button--next");

	expect(() => results.toHaveClass("duk-pagination"));
	expect(results.container.querySelector(".duk-button--active").innerHTML).toBe("1");
	expect(prev.hasAttribute("disabled")).toBe(true);

	await fireEvent.click(next);
	expect(results.container.querySelector(".duk-button--active").innerHTML).toBe("2");

	await fireEvent.click(prev);
	expect(results.container.querySelector(".duk-button--active").innerHTML).toBe("1");

	let pageNumberButtonNodeList = results.container.querySelectorAll(".duk-pagination__button");

	await fireEvent.click(pageNumberButtonNodeList[pageNumberButtonNodeList.length - 2]);
	expect(results.container.querySelector(".duk-button--active").innerHTML).toBe("18");
	expect(next.hasAttribute("disabled")).toBe(true);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-pagination-snap.png")).toMatchImageSnapshot();
});
