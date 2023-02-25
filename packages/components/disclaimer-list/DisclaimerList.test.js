import fs from "fs";
import { render } from "@testing-library/svelte";
import DisclaimerList from "./DisclaimerList.svelte";
import Item from "./Item.svelte";

test("DisclaimerList Component renders correctly", () => {
	const results = render(DisclaimerList);
	expect(() => results.toHaveClass("duk-disclaimer-list"));
});

test("DisclaimerList Item Component renders correctly", () => {
	const results = render(Item);
	expect(() => results.toHaveClass("duk-disclaimer-list__item"));
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/molecules-disclaimer-list-snap.png"),
	).toMatchImageSnapshot();
});
