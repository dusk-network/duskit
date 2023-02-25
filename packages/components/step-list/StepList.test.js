import fs from "fs";
import { render } from "@testing-library/svelte";
import StepList from "./StepList.svelte";
import Item from "./StepList.svelte";
import variants from "@dusk-network/utilities/variants.js";

test("StepList component renders with correct styles", () => {
	const results = render(StepList, {
		props: {
			variant: variants.STEP_LIST.BRAND,
		},
	});
	expect(() => results.toHaveClass("duk-step-list"));
	expect(() => results.toHaveClass("duk-step-list--brand"));
});

test("StepList Item component renders with correct styles and Icon", () => {
	const results = render(Item, {
		props: {
			iconName: "dusk-ticker",
		},
	});
	expect(() => results.toHaveClass("duk-step-list__item"));
	expect(() => results.toHaveClass("duk-step-list__item--icon"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-step-list-snap.png")).toMatchImageSnapshot();
});
