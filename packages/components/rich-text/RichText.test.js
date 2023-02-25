import fs from "fs";
import { render } from "@testing-library/svelte";
import RichText from "./RichText.svelte";
import sizes from "@dusk-network/utilities/sizes.js";

test("RichText Component renders with correct size and alignment", () => {
	const results = render(RichText, {
		props: {
			size: sizes.RICH_TEXT.LARGE,
			align: "center",
		},
	});
	expect(() => results.toHaveClass("duk-rich-text"));
	expect(() => results.toHaveClass("duk-rich-text--large"));
	expect(() => results.toHaveClass("duk-rich-text--center"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-rich-text-snap.png")).toMatchImageSnapshot();
});
