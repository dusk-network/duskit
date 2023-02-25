import fs from "fs";
import { render } from "@testing-library/svelte";
import Card from "./Card.svelte";
import variants from "@dusk-network/utilities/variants.js";
import states from "@dusk-network/utilities/states.js";

test("Card component renders as anchor tag", () => {
	let link = "test link";
	const results = render(Card, {
		props: {
			href: link,
			variant: variants.CARD.BRAND,
			state: states.CARD.ERROR,
			disabled: true,
			overflow: true,
		},
	});
	expect(() => results.toHaveClass("duk-card"));
	expect(() => results.toHaveClass("duk-card--brand"));
	expect(() => results.toHaveClass("duk-card--error"));
	expect(() => results.toHaveClass("duk-card--disabled"));
	expect(() => results.toHaveClass("duk-card--overflow"));

	//Check if Card component is rendered as an anchor tag
	expect(results.container.querySelector("a").getAttribute("href")).toBe(link);
});

test("Card component renders as div", () => {
	const results = render(Card, {
		props: {
			variant: variants.CARD.BRAND,
			state: states.CARD.ERROR,
			disabled: true,
			overflow: true,
		},
	});
	expect(() => results.toHaveClass("duk-card"));
	expect(() => results.toHaveClass("duk-card--brand"));
	expect(() => results.toHaveClass("duk-card--error"));
	expect(() => results.toHaveClass("duk-card--disabled"));
	expect(() => results.toHaveClass("duk-card--overflow"));

	//Check if Card component is not rendered as an anchor tag
	expect(results.container.querySelector("a")).toBe(null);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-card-snap.png")).toMatchImageSnapshot();
});
