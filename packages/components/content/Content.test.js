import fs from "fs";
import { render } from "@testing-library/svelte";
import Content from "./Content.svelte";

test("Content Component renders correctly", () => {
	const results = render(Content, {});
	expect(() => results.toHaveClass("duk-content"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-content-snap.png")).toMatchImageSnapshot();
});
