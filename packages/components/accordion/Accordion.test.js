import fs from "fs";
import { render } from "@testing-library/svelte";
import Accordion from "./Accordion.svelte";

test("Accordion Component renders correctly", () => {
	const results = render(Accordion);
	expect(() => results.toHaveClass("duk-accordion"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-accordion-snap.png")).toMatchImageSnapshot();
});
