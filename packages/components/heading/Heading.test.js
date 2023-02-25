import fs from "fs";
import { render } from "@testing-library/svelte";
import Heading from "./Heading.svelte";
import variants from "@dusk-network/utilities/variants.js";
import sizes from "@dusk-network/utilities/sizes.js";

test("Heading Component renders with correct styles", () => {
	const results = render(Heading, {
		props: {
			size: sizes.HEADING.LARGE,
			variant: variants.HEADING.DANGER,
			align: "center",
		},
	});
	expect(() => results.toHaveClass("duk-heading"));
	expect(() => results.toHaveClass("duk-heading--large"));
	expect(() => results.toHaveClass("duk-heading--danger"));
	expect(() => results.toHaveClass("duk-heading--center"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-heading-snap.png")).toMatchImageSnapshot();
});
