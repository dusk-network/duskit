import fs from "fs";
import { render } from "@testing-library/svelte";
import Logo from "./Logo.svelte";

test("Logo Component renders correctly", () => {
	const results = render(Logo);
	expect(() => results.toHaveClass("logo"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-logo-snap.png")).toMatchImageSnapshot();
});
