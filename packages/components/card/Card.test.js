import fs from "fs";
import { render } from "@testing-library/svelte";
import Card from "./Card.svelte";

test("Card component renders as div", () => {
	const results = render(Card, {
		props: {
			background: false,
		},
	});
	expect(() => results.toHaveClass("duk-card"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-card-snap.png")).toMatchImageSnapshot();
});
