import fs from "fs";
import { render } from "@testing-library/svelte";
import Text from "./Text.svelte";
import sizes from "@dusk-network/utilities/sizes.js";

test("Text Component renders with correct size and alignment", () => {
	const results = render(Text, {
		props: {
			size: sizes.TEXT.LARGE,
			align: "center",
		},
	});
	expect(() => results.toHaveClass("duk-text"));
	expect(() => results.toHaveClass("duk-text--large"));
	expect(() => results.toHaveClass("duk-text--center"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-text-snap.png")).toMatchImageSnapshot();
});
