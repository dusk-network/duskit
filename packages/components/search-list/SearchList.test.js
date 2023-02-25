import fs from "fs";
import { render } from "@testing-library/svelte";
import SearchList from "./SearchList.svelte";
import { data } from "../../../storybook/stories/search-list/data";

test("Search List Component renders correctly without search button", () => {
	const results = render(SearchList, {
		props: {
			data: data,
		},
	});
	expect(() => results.toHaveClass("duk-search-list"));
});

test("Search List Component renders correctly with search button", () => {
	const results = render(SearchList, {
		props: {
			data: data,
			fieldButton: true,
		},
	});
	expect(() => results.toHaveClass("duk-search-list"));
	expect(() => results.toHaveClass("duk-button"));
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/organisms-search-list-snap.png"),
	).toMatchImageSnapshot();
});
