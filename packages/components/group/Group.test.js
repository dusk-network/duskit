import fs from "fs";
import { render } from "@testing-library/svelte";
import Group from "./Group.svelte";

test("Group Component renders with correct styles", () => {
	const results = render(Group, {
		props: {
			align: "center",
			grid: true,
		},
	});
	expect(() => results.toHaveClass("duk-group"));
	expect(() => results.toHaveClass("duk-group--center"));
	expect(() => results.toHaveClass("duk-group--grid"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-group-snap.png")).toMatchImageSnapshot();
});
