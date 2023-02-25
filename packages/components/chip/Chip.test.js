import fs from "fs";
import { render } from "@testing-library/svelte";
import Chip from "./Chip.svelte";

test("Chip component renders correctly", () => {
	const results = render(Chip, {});
	expect(() => results.toHaveClass("duk-chip"));
});

test("Chip Component renders with correct variant", () => {
	const results = render(Chip, { props: { variant: "brand" } });
	expect(() => results.toHaveClass("duk-chip--brand"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-chip-snap.png")).toMatchImageSnapshot();
});
