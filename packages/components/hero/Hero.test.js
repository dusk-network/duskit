import fs from "fs";
import { render } from "@testing-library/svelte";
import Hero from "./Hero.svelte";

test("Hero Component renders correctly", () => {
	const results = render(Hero);
	expect(() => results.toHaveClass("duk-hero"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-hero-snap.png")).toMatchImageSnapshot();
});
