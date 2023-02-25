import fs from "fs";
import { render } from "@testing-library/svelte";
import DetailList from "./DetailList.svelte";

test("DetailList Component renders with correct proportion", () => {
	const results = render(DetailList, {
		props: {
			split: "25/75",
		},
	});
	expect(() => results.toHaveClass("duk-detail-list"));
	expect(() => results.toHaveClass("duk-detail-list--25-75"));
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/molecules-detail-list-snap.png"),
	).toMatchImageSnapshot();
});
