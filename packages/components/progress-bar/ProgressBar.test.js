import fs from "fs";
import { render } from "@testing-library/svelte";
import ProgressBar from "./ProgressBar.svelte";
import variants from "@dusk-network/utilities/variants.js";

let step = 1;
let steps = 3;
test("ProgressBar Component renders with correct variant and progress width", () => {
	const results = render(ProgressBar, {
		props: { steps: steps, step: step, variant: variants.PROGRESS_BAR.BRAND },
	});
	expect(() => results.toHaveClass("duk-progress-bar"));
	expect(() => results.toHaveClass("duk-progress-bar--brand"));
	expect(results.container.querySelector(".duk-progress-bar__step").style.width).toEqual(
		`${(step * 100) / steps}%`,
	);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-progress-bar-snap.png")).toMatchImageSnapshot();
});
