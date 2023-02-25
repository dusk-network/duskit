import fs from "fs";
import { render } from "@testing-library/svelte";
import TruncateText from "./TruncateText.svelte";
import { widths } from "@dusk-network/utilities";

test("TruncateText Component renders with correct output", () => {
	const results = render(TruncateText, {
		props: {
			width: widths.TRUNCATE_TEXT.HALF,
			title: "Truncate test",
			text: "Truncate text test",
		},
	});
	expect(() => results.toHaveClass("duk-truncate-text"));
	expect(() => results.toHaveClass("duk-truncate-slice"));
	expect(() => results.toHaveClass("duk-truncate-text--half"));
	let truncateText = results.container.querySelector(".duk-truncate-text__value");
	expect(truncateText.innerHTML).toBe("Truncate ...");
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-truncate-text-snap.png")).toMatchImageSnapshot();
});
