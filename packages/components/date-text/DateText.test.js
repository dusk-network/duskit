import fs from "fs";
import { render } from "@testing-library/svelte";
import DateText from "./DateText.svelte";

test("Date Text Component renders correctly", () => {
	const results = render(DateText, {});
	expect(() => results.toHaveClass("duk-date-text"));
});

test("Date Text Component renders with correct output", () => {
	const results = render(DateText, {
		props: { time: "2021-01-01 21:03:02 +0000 UTC" },
	});
	expect(() => results.toBe("1 year ago"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-date-text-snap.png")).toMatchImageSnapshot();
});
