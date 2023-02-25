import fs from "fs";
import { render } from "@testing-library/svelte";
import LoadingIndicator from "./LoadingIndicator.svelte";
import variants from "@dusk-network/utilities/variants.js";

test("LoadingIndicator Component renders correctly", () => {
	const results = render(LoadingIndicator, {
		props: { variant: variants.LOADING_INDICATOR.BRAND },
	});
	expect(() => results.toHaveClass("duk-loading-indicator"));
	expect(() => results.toHaveClass("duk-loading-indicator--brand"));
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/atoms-loading-indicator-snap.png"),
	).toMatchImageSnapshot();
});
